import type { Meta } from "@storybook/react";
import Stack from ".";

const meta: Meta<typeof Stack> = {
  title: "Component/Stack",
  component: Stack,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Horizontal() {
  return (
    <Stack variant="horizontal" className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  );
}
export function Vertical() {
  return (
    <Stack variant="vertical" className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  );
}
export function Wrap() {
  return (
    <Stack wrap className="gap-4">
      {[...Array(12).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  );
}
export function Reverse() {
  return (
    <Stack reverse className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  );
}

export default meta;
