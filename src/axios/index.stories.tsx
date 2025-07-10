import { Box, Button } from "@/components";
import type { Meta } from "@storybook/react";
import { InternalAxiosRequestConfig } from "axios";
import { useCallback, useEffect } from "react";
import AxiosProvider from "./AxiosProvider";
import useAxios from "./useAxios";

const meta: Meta = {
  title: "Axios/useAxios",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

function Component() {
  const [axios, loading] = useAxios();
  const getData = () => {
    const url = "/posts";
    axios.get(url).then(({ data }) => {
      console.log(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <Button type="button" loading={loading} onClick={getData}>
        Show drawer
      </Button>
    </Box>
  );
}
export function Default() {
  const accessToken = "";
  const setToken = useCallback((token: unknown) => {
    console.log(token);
  }, []);
  const handleRequestToken = useCallback(
    (req: InternalAxiosRequestConfig) => {
      if (accessToken) {
        req.headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return req;
    },
    [accessToken]
  );
  const handleUnauthorized = useCallback(
    // eslint-disable-next-line
    async (error: any) => {
      const isUnauthorized = error?.response?.status === 401;
      if (!isUnauthorized) return;
      setToken(null);
    },
    [setToken]
  );
  const handleErrorMessage = useCallback(() => {
    return "خطایی رخ داده است";
  }, []);
  const handleError = useCallback(
    // eslint-disable-next-line
    (error: any) => {
      const isUnauthorized = error?.response?.status === 401;
      const isCanceled = error?.code === "ERR_CANCELED";
      const message = handleErrorMessage();
      if (!isCanceled && !isUnauthorized) console.error(message);
    },
    [handleErrorMessage]
  );
  return (
    <AxiosProvider
      config={{ baseURL: "https://jsonplaceholder.typicode.com" }}
      beforeRequest={[handleRequestToken]}
      afterError={[handleError, handleUnauthorized]}
      cancelOnUnmount
      cancelDuplicatedRequests
    >
      <Component />
    </AxiosProvider>
  );
}

export default meta;
