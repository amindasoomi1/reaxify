import { Button } from "@/components";
import { useToggle } from "@/hooks";
import type { Meta } from "@storybook/react";
import { Fragment } from "react/jsx-runtime";
import AxiosProvider from "./AxiosProvider";
import useAxios from "./useAxios";

const meta: Meta<typeof AxiosProvider> = {
  title: "Component/AxiosProvider",
  component: AxiosProvider,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

function Component({ click }: { click: VoidFunction }) {
  const [axios, loading] = useAxios({
    config: { baseURL: "https://jsonplaceholder.typicode.com" },
    cancelOnUnmount: true,
    // beforeRequest: [async () => (await wait(1000)) as undefined],
  });
  const getSocialMedia = () => {
    setTimeout(() => {
      click();
    }, 100);
    const url = "/todos";
    axios.get(url);
  };
  return (
    <Button onClick={getSocialMedia} variant="solid" color="primary">
      {loading ? "Loading..." : "Get data"}
    </Button>
  );
}

export function App() {
  // const socialMedia = [
  //   { icon: "mgc_telegram_fill", link: "" },
  //   { icon: "mgc_social_x_line", link: "" },
  //   { icon: "mgc_instagram_line", link: "" },
  // ];
  const [show, toggle, hide] = useToggle(true);
  return (
    <Fragment>
      {show && (
        <Component
          click={() => {
            hide();
            setTimeout(() => {
              toggle();
            }, 1000);
          }}
        />
      )}
    </Fragment>
  );
}

export default meta;
