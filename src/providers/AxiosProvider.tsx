import { ChildrenProps } from "@/types";
import {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { createContext } from "react";

type Callback<T> = (input: T) => T | Promise<T>;

type BaseProps = {
  config: CreateAxiosDefaults;
  beforeRequest: Callback<InternalAxiosRequestConfig>[];
  afterResponse: Callback<AxiosResponse>[];
};
type Props = Partial<BaseProps> & ChildrenProps;

type Context = BaseProps;

export const AxiosContext = createContext<Context>({
  config: {},
  beforeRequest: [],
  afterResponse: [],
});

export default function AxiosProvider({
  config = {},
  beforeRequest = [],
  afterResponse = [],
  children,
}: Props) {
  return (
    <AxiosContext.Provider value={{ config, beforeRequest, afterResponse }}>
      {children}
    </AxiosContext.Provider>
  );
}
