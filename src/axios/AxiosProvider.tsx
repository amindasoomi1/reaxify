import { ChildrenProps } from "@/types";
import { createContext } from "react";
import type { AxiosConfig } from "./types";

type Props = Partial<AxiosConfig> & ChildrenProps;

type Context = AxiosConfig;

export const AxiosContext = createContext<Context>({
  config: {},
  cancelDuplicatedRequests: false,
  cancelOnUnmount: false,
  beforeRequest: [],
  afterResponse: [],
  afterError: [],
  beforeRetry: [],
  retry: null,
});

export default function AxiosProvider({
  config = {},
  cancelDuplicatedRequests = false,
  cancelOnUnmount = false,
  beforeRetry = [],
  beforeRequest = [],
  afterResponse = [],
  afterError = [],
  retry = null,
  children,
}: Props) {
  return (
    <AxiosContext.Provider
      value={{
        config,
        cancelDuplicatedRequests,
        cancelOnUnmount,
        beforeRequest,
        afterResponse,
        afterError,
        beforeRetry,
        retry,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}
