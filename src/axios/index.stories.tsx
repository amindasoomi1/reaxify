import { Box, Button } from "@/components";
import type { Meta } from "@storybook/react";
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
  return (
    <Box>
      <Button type="button" loading={loading} onClick={getData}>
        Show drawer
      </Button>
    </Box>
  );
}
export function Default() {
  return (
    <AxiosProvider
      config={{ baseURL: "https://jsonplaceholder.typicode.com" }}
      cancelOnUnmount
      cancelDuplicatedRequests
    >
      <Component />
    </AxiosProvider>
  );
}

export default meta;
