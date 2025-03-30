import baseAxios, {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { cloneDeep } from "lodash";
import process from "process";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { AxiosContext } from "../providers/AxiosProvider";

type Loading = string[];
type Error = { [key in string]: unknown };
type Callback<T> = (input: T) => T | Promise<T>;
type Config = null | {
  config?: CreateAxiosDefaults;
  beforeRequest?: Callback<InternalAxiosRequestConfig>[];
  afterResponse?: Callback<AxiosResponse>[];
};

export default function useAxios(axiosConfig: Config = null) {
  const axiosContext = useContext(AxiosContext);
  const controller = useMemo(() => new AbortController(), []);
  const axios = useMemo(() => {
    const config = { ...axiosContext.config, ...axiosConfig?.config };
    return baseAxios.create(config);
  }, [axiosContext.config, axiosConfig?.config]);
  const [loading, setLoading] = useState<Loading>([]);
  const [error, setError] = useState<Error | null>(null);

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
      return handlers.reduce(
        async (prev, current) => current(await prev),
        Promise.resolve(request)
      );
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
      return handlers.reduce(
        async (prev, current) => current(await prev),
        Promise.resolve(response)
      );
    },
    [axiosContext.afterResponse, axiosConfig?.afterResponse]
  );
  const requestHandler = useCallback(
    async (request: InternalAxiosRequestConfig) => {
      request.signal ||= controller.signal;
      loadingHandler(true);
      setError(null);
      const result = await beforeRequestHandler(request);
      return result;
    },
    [controller, loadingHandler, beforeRequestHandler]
  );
  const responseHandler = useCallback(
    async (response: AxiosResponse) => {
      const result = await afterResponseHandler(response);
      loadingHandler(false);
      setError(null);
      return result;
    },
    [loadingHandler, afterResponseHandler]
  );
  const errorHandler = useCallback(
    (error: unknown) => {
      loadingHandler(false);
      setError(error as Error);
      return Promise.reject(error);
    },
    [loadingHandler]
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
      const development = process.env.NODE_ENV !== "production";
      !development && controller.abort("Canceled.");
    };
  }, []);
  return [axios, Boolean(loading.length), error] as const;
}
