import type { Meta } from "@storybook/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  useAxios,
  useCreateRipple,
  useDebounce,
  useKeyDown,
  useMouse,
  useOutsideClick,
  usePersistedState,
} from ".";
import { Button, Skeleton, Stack, Typography } from "../components";

const meta: Meta = {
  title: "Hooks",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function CreateRipple() {
  const createRipple = useCreateRipple();
  return (
    <button
      type="button"
      className="relative overflow-hidden p-4"
      onClick={createRipple}
    >
      Click me
    </button>
  );
}
export function Debounce() {
  const debounce = useDebounce();
  return (
    <input
      type="text"
      className="w-full h-10 border rounded px-4"
      placeholder="Please type ..."
      onChange={(e) => {
        debounce(() => {
          alert(e.target.value);
        });
      }}
    />
  );
}
export function KeyDown() {
  const key = useKeyDown();
  return <Typography>{key ?? "Press key"}</Typography>;
}
export function PersistedState() {
  const [count, setCount, clearCount] = usePersistedState("count", 0);
  return (
    <Stack className="gap-4">
      <Button type="button" onClick={() => setCount((p) => p + 1)}>
        Count is {count}
      </Button>
      <Button type="button" onClick={() => window.location.reload()}>
        Reload page
      </Button>
      <Button type="button" onClick={clearCount}>
        Clear count
      </Button>
    </Stack>
  );
}
export function Mouse() {
  const [x, y] = useMouse();
  return (
    <Stack className="gap-4">
      <Typography>X is: {x}</Typography>
      <Typography>Y is: {y}</Typography>
    </Stack>
  );
}
export function OutsideClick() {
  const ref = useRef<HTMLButtonElement>(null);
  useOutsideClick(ref, () => {
    // do something
  });
  return (
    <Stack className="gap-4">
      <button ref={ref} type="button">
        Click outside me!
      </button>
    </Stack>
  );
}
export function Axios() {
  const [axios, loading, error] = useAxios();
  const [data, setData] = useState<null | object>(null);
  const getData = () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    axios.get(url).then(({ data }) => {
      setData(data);
    });
  };
  useEffect(getData, []);
  return (
    <Stack variant="vertical" className="items-start gap-4">
      {loading ? (
        <Fragment>
          <Skeleton className="w-1/3" />
          <Skeleton className="w-1/3" />
          <Skeleton className="w-1/3" />
        </Fragment>
      ) : error ? (
        <p className="text-danger">An error accord!</p>
      ) : data ? (
        <Fragment>
          <Button type="button" onClick={getData}>
            Get data
          </Button>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Fragment>
      ) : (
        <p className="text-dark">There is no data</p>
      )}
    </Stack>
  );
}

export default meta;
