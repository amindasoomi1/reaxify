import baseAxios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AxiosContext } from "./AxiosProvider";
import type { AxiosConfig, Error, Loading } from "./types";

export default function useAxios(
  axiosConfig: Partial<AxiosConfig> | null = null
) {
  const cancelMessage = "Canceled.";
  const axiosContext = useContext(AxiosContext);
  const allControllers = useRef<AbortController[]>([]);
  const pendingRequests = useMemo(() => new Map<string, AbortController>(), []);
  // const controller = useMemo(() => new AbortController(), []);
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

  const [loading, setLoading] = useState<Loading>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleSetCancelDuplicated = useCallback(
    (request: InternalAxiosRequestConfig) => {
      if (!cancelDuplicated && !cancelOnUnmount) return request;
      const key = `${request.method}-${request.url}`;
      const controller = new AbortController();
      if (cancelDuplicated && pendingRequests.has(key)) {
        pendingRequests.get(key)?.abort(cancelMessage);
      }
      if (cancelDuplicated || cancelOnUnmount) {
        request.signal = controller.signal;
      }
      if (cancelDuplicated) pendingRequests.set(key, controller);
      if (cancelOnUnmount) allControllers.current.push(controller);
      return request;
    },
    [pendingRequests, cancelDuplicated, cancelOnUnmount]
  );
  const handleDeleteCancelDuplicated = useCallback(
    (config: InternalAxiosRequestConfig | null) => {
      if (!config) return;
      const key = `${config.method}-${config.url}`;
      pendingRequests.delete(key);
    },
    [pendingRequests]
  );
  const loadingHandler = useCallback((value: boolean) => {
    setLoading((p) => {
      const loading = [...p];
      value ? loading.push("") : loading.pop();
      return loading;
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
      return handlers.reduce(
        async (prev, current) => current(await prev),
        Promise.resolve(error)
      );
    },
    [axiosContext.afterError, axiosConfig?.afterError]
  );
  const requestHandler = useCallback(
    async (request: InternalAxiosRequestConfig) => {
      // request.signal ||= controller.signal;
      const handledRequest = handleSetCancelDuplicated(request);
      loadingHandler(true);
      setError(null);
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
      return result;
    },
    [loadingHandler, afterResponseHandler, handleDeleteCancelDuplicated]
  );
  const errorHandler = useCallback(
    async (error: Error) => {
      const isCanceled = [
        error?.code === "ERR_CANCELED",
        error?.config?.signal?.reason === cancelMessage,
      ].some(Boolean);
      !isCanceled && handleDeleteCancelDuplicated(error?.config);
      const result = await afterErrorHandler(error);
      loadingHandler(false);
      !isCanceled && setError(result as Error);
      return Promise.reject(result);
    },
    [loadingHandler, afterErrorHandler, handleDeleteCancelDuplicated]
  );

  useLayoutEffect(() => {
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
  useLayoutEffect(() => {
    return () => {
      if (cancelOnUnmount) {
        allControllers.current.forEach((controller) => {
          controller.abort(cancelMessage);
        });
        allControllers.current = [];
      }
    };
  }, [cancelOnUnmount]);
  return [axios, Boolean(loading.length), error] as const;
}
