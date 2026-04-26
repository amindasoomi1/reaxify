import type { Meta } from "@storybook/react";
import { useCreateRipple, useDebounce, usePersistedState } from ".";
import { Button, Stack } from "../components";

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
      className="w-full h-10 border border-border rounded px-4"
      placeholder="Please type ..."
      onChange={(e) => {
        debounce(() => {
          alert(e.target.value);
        });
      }}
    />
  );
}
export function PersistedState() {
  const [count, setCount, clearCount] = usePersistedState(0, { name: "count" });
  return (
    <Stack className="gap-4">
      <Button type="button" onClick={() => setCount((p) => p + 1)}>
        Count is {count}
      </Button>
      <Button type="button" onClick={() => setCount(count + 2)}>
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

export default meta;
