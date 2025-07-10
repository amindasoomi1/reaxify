import {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";

export type Loading = string[];
// eslint-disable-next-line
export type Error = any;
export type Callback<T> = (
  input: T
) => T | undefined | void | Promise<T | undefined | void>;
export type AxiosConfig = {
  config: CreateAxiosDefaults;
  cancelDuplicatedRequests: boolean;
  cancelOnUnmount: boolean;
  beforeRequest: Callback<InternalAxiosRequestConfig>[];
  afterResponse: Callback<AxiosResponse>[];
  // eslint-disable-next-line
  afterError: Callback<any>[];
  beforeRetry: Callback<InternalAxiosRequestConfig>[];
  retry: null | {
    count?: number;
    delay?: number;
    statuses?: number[];
  };
};
