import type { Meta } from "@storybook/react";
import { useRef } from "react";
import {
  useCreateRipple,
  useDebounce,
  useKeyDown,
  useMouse,
  useOutsideClick,
  usePersistedState,
} from ".";
import { Button, Stack, Typography } from "../components";

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
      className="w-full h-10 border border-[#e8eaee]rounded px-4"
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

export default meta;
