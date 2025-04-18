import baseAxios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cloneDeep } from "lodash";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { AxiosContext } from "./AxiosProvider";
import type { AxiosConfig, Error, Loading } from "./types";

export default function useAxios(
  axiosConfig: Partial<AxiosConfig> | null = null
) {
  const cancelMessage = "Canceled due to duplication.";
  const axiosContext = useContext(AxiosContext);
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
  const [loading, setLoading] = useState<Loading>([]);
  const [error, setError] = useState<Error | null>(null);

  const handleSetCancelDuplicated = useCallback(
    (request: InternalAxiosRequestConfig) => {
      if (!cancelDuplicated) return request;
      const key = `${request.method}-${request.url}`;
      if (pendingRequests.has(key)) {
        pendingRequests.get(key)?.abort(cancelMessage);
      }
      const controller = new AbortController();
      request.signal = controller.signal;
      pendingRequests.set(key, controller);
      return request;
    },
    [pendingRequests, cancelDuplicated]
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
      const loading = cloneDeep(p);
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
      const isCanceled = error?.config?.signal.reason === cancelMessage;
      !isCanceled && handleDeleteCancelDuplicated(error?.config);
      const result = await afterErrorHandler(error);
      loadingHandler(false);
      setError(error as Error);
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
  // useLayoutEffect(() => {
  //   return () => {
  //     const development = process.env.NODE_ENV !== "production";
  //     !development && controller.abort("Canceled.");
  //   };
  // }, []);
  return [axios, Boolean(loading.length), error] as const;
}
