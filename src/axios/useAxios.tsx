import { wait } from "@/helpers";
import baseAxios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { AxiosContext } from "./AxiosProvider";
import type { AxiosConfig, Error, Loading } from "./types";

export default function useAxios(
  axiosConfig: Partial<AxiosConfig> | null = null
) {
  const cancelMessage = "Canceled.";
  const axiosContext = useContext(AxiosContext);
  const allControllers = useRef<AbortController[]>([]);
  const pendingRequests = useRef(new Map<string, AbortController>());
  const retryCount = useRef(0);
  const [isPending, startTransition] = useTransition();
  const axios = useMemo(() => {
    const config = { ...axiosContext.config, ...axiosConfig?.config };
    return baseAxios.create(config);
  }, [axiosContext.config, axiosConfig?.config]);
  const cancelDuplicated = useMemo(() => {
    return typeof axiosConfig?.cancelDuplicatedRequests === "boolean"
      ? axiosConfig.cancelDuplicatedRequests
      : axiosContext.cancelDuplicatedRequests ?? false;
  }, [
    axiosContext.cancelDuplicatedRequests,
    axiosConfig?.cancelDuplicatedRequests,
  ]);
  const cancelOnUnmount = useMemo(() => {
    return typeof axiosConfig?.cancelOnUnmount === "boolean"
      ? axiosConfig.cancelOnUnmount
      : axiosContext.cancelOnUnmount ?? false;
  }, [axiosConfig?.cancelOnUnmount, axiosContext.cancelOnUnmount]);
  const retry = useMemo(() => {
    if (!axiosContext?.retry && !axiosConfig?.retry) return null;
    return {
      count: 0,
      delay: 0,
      statuses: [],
      ...axiosContext.retry,
      ...axiosConfig?.retry,
    };
  }, [axiosConfig?.retry, axiosContext.retry]);

  const [loading, setLoading] = useState<Loading>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleSetCancelDuplicated = useCallback(
    (request: InternalAxiosRequestConfig) => {
      if (!cancelDuplicated && !cancelOnUnmount) return request;
      const key = `${request.method}-${request.url}`;
      const controller = new AbortController();
      if (cancelDuplicated && pendingRequests.current.has(key)) {
        pendingRequests.current.get(key)?.abort(cancelMessage);
      }
      if (cancelDuplicated || cancelOnUnmount) {
        request.signal = controller.signal;
      }
      if (cancelDuplicated) pendingRequests.current.set(key, controller);
      if (cancelOnUnmount) allControllers.current.push(controller);
      return request;
    },
    [cancelDuplicated, cancelOnUnmount]
  );
  const handleDeleteCancelDuplicated = useCallback(
    (config: InternalAxiosRequestConfig | null) => {
      if (!config) return;
      const key = `${config.method}-${config.url}`;
      pendingRequests.current.delete(key);
    },
    []
  );
  const loadingHandler = useCallback((value: boolean) => {
    startTransition(() => {
      setLoading((p) => {
        const loading = [...p];
        value ? loading.push("") : loading.pop();
        return loading;
      });
    });
  }, []);
  const beforeRequestHandler = useCallback(
    (request: InternalAxiosRequestConfig) => {
      const handlers = [
        ...axiosContext.beforeRequest,
        ...(axiosConfig?.beforeRequest ?? []),
      ];
      if (!handlers.length) return request;
      return handlers.reduce(async (prevPromise, currentHandler) => {
        const prev = await prevPromise;
        const result = await currentHandler(prev);
        return result ?? prev;
      }, Promise.resolve(request));
    },
    [axiosContext.beforeRequest, axiosConfig?.beforeRequest]
  );
  const afterResponseHandler = useCallback(
    (response: AxiosResponse) => {
      const handlers = [
        ...axiosContext.afterResponse,
        ...(axiosConfig?.afterResponse ?? []),
      ];
      if (!handlers.length) return response;
      return handlers.reduce(async (prevPromise, currentHandler) => {
        const prev = await prevPromise;
        const result = await currentHandler(prev);
        return result ?? prev;
      }, Promise.resolve(response));
    },
    [axiosContext.afterResponse, axiosConfig?.afterResponse]
  );
  const afterErrorHandler = useCallback(
    (error: Error) => {
      const handlers = [
        ...axiosContext.afterError,
        ...(axiosConfig?.afterError ?? []),
      ];
      if (!handlers.length) return error;
      return handlers.reduce(async (prevPromise, currentHandler) => {
        const prev = await prevPromise;
        const result = await currentHandler(prev);
        return result ?? prev;
      }, Promise.resolve(error));
    },
    [axiosContext.afterError, axiosConfig?.afterError]
  );
  const beforeRetryHandler = useCallback(
    (error: Error) => {
      const handlers = [
        ...axiosContext.beforeRetry,
        ...(axiosConfig?.beforeRetry ?? []),
      ];
      if (!handlers.length) return error;
      return handlers.reduce(async (prevPromise, currentHandler) => {
        const prev = await prevPromise;
        const result = await currentHandler(prev);
        return result ?? prev;
      }, Promise.resolve(error));
    },
    [axiosContext.beforeRetry, axiosConfig?.beforeRetry]
  );
  const canRetry = useCallback(
    (status: number) => {
      if (!retry) return false;
      const count = retry.count ?? 0;
      const statuses = retry.statuses ?? [];
      if (retryCount.current >= count) return false;
      if (!statuses.includes(status)) return false;
      return true;
    },
    [retry]
  );
  const incrementRetryCount = useCallback(() => {
    retryCount.current++;
  }, []);
  const resetRetryCount = useCallback(() => {
    retryCount.current = 0;
  }, []);
  const requestHandler = useCallback(
    async (request: InternalAxiosRequestConfig) => {
      // request.signal ||= controller.signal;
      loadingHandler(true);
      setError(null);
      const handledRequest = handleSetCancelDuplicated(request);
      const result = await beforeRequestHandler(handledRequest);
      return result;
    },
    [handleSetCancelDuplicated, loadingHandler, beforeRequestHandler]
  );
  const responseHandler = useCallback(
    async (response: AxiosResponse) => {
      handleDeleteCancelDuplicated(response.config);
      const result = await afterResponseHandler(response);
      loadingHandler(false);
      setError(null);
      resetRetryCount();
      return result;
    },
    [
      loadingHandler,
      afterResponseHandler,
      handleDeleteCancelDuplicated,
      resetRetryCount,
    ]
  );
  const errorHandler = useCallback(
    async (error: Error) => {
      const isCanceled = [
        error?.code === "ERR_CANCELED",
        error?.config?.signal?.reason === cancelMessage,
      ].some(Boolean);
      const status = error?.response?.status ?? 0;
      if (!isCanceled && canRetry(status)) {
        if (retry?.delay) await wait(retry.delay);
        const handledError = await beforeRetryHandler(error);
        incrementRetryCount();
        return axios
          .request(handledError?.config)
          .finally(() => loadingHandler(false));
      }
      !isCanceled && handleDeleteCancelDuplicated(error?.config);
      const result = await afterErrorHandler(error);
      loadingHandler(false);
      resetRetryCount();
      !isCanceled && setError(result as Error);
      return Promise.reject(result);
    },
    [
      loadingHandler,
      afterErrorHandler,
      handleDeleteCancelDuplicated,
      beforeRetryHandler,
      canRetry,
      resetRetryCount,
      incrementRetryCount,
      retry?.delay,
    ]
  );

  useEffect(() => {
    const req = axios.interceptors.request.use(requestHandler);
    const res = axios.interceptors.response.use(responseHandler, errorHandler);
    return () => {
      axios.interceptors.request.eject(req);
      axios.interceptors.response.eject(res);
    };
  }, [
    axios.interceptors.request,
    axios.interceptors.response,
    requestHandler,
    responseHandler,
    errorHandler,
  ]);
  useEffect(() => {
    return () => {
      if (cancelOnUnmount) {
        allControllers.current.forEach((controller) => {
          controller.abort(cancelMessage);
        });
        allControllers.current = [];
      }
    };
  }, [cancelOnUnmount]);
  return [axios, Boolean(loading.length) || isPending, error] as const;
}
