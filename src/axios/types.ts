import {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";

export type Loading = string[];
// eslint-disable-next-line
export type Error = any;
export type Callback<T> = (input: T) => T | Promise<T> | undefined;
export type AxiosConfig = {
  config: CreateAxiosDefaults;
  cancelDuplicatedRequests: boolean;
  beforeRequest: Callback<InternalAxiosRequestConfig>[];
  afterResponse: Callback<AxiosResponse>[];
  afterError: Callback<Error>[];
};
