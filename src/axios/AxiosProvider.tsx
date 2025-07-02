import { ChildrenProps } from "@/types";
import { createContext, useCallback } from "react";
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
});

export default function AxiosProvider({
  config = {},
  cancelDuplicatedRequests = false,
  cancelOnUnmount = false,
  beforeRequest = [],
  afterResponse = [],
  afterError = [],
  children,
}: Props) {
  // eslint-disable-next-line
  const defaultAfterError = useCallback((error: any) => {
    return Promise.reject(error);
  }, []);
  return (
    <AxiosContext.Provider
      value={{
        config,
        cancelDuplicatedRequests,
        cancelOnUnmount,
        beforeRequest,
        afterResponse,
        afterError: [defaultAfterError, ...afterError],
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}
