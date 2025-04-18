import { ChildrenProps } from "@/types";
import { createContext } from "react";
import type { AxiosConfig } from "./types";

type Props = Partial<AxiosConfig> & ChildrenProps;

type Context = AxiosConfig;

export const AxiosContext = createContext<Context>({
  config: {},
  cancelDuplicatedRequests: false,
  beforeRequest: [],
  afterResponse: [],
  afterError: [],
});

export default function AxiosProvider({
  config = {},
  cancelDuplicatedRequests = false,
  beforeRequest = [],
  afterResponse = [],
  afterError = [],
  children,
}: Props) {
  return (
    <AxiosContext.Provider
      value={{
        config,
        cancelDuplicatedRequests,
        beforeRequest,
        afterResponse,
        afterError,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}
