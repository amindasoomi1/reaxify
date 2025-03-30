import type { Meta } from "@storybook/react";
import { Stack } from ".";
import { Box } from "../Box";

const meta: Meta<typeof Stack> = {
  title: "Component/Stack",
  component: Stack,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Horizontal() {
  return (
    <Stack variant="horizontal" className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <Box key={key} className="p-6 border border-black">
          Box
        </Box>
      ))}
    </Stack>
  );
}
export function Vertical() {
  return (
    <Stack variant="vertical" className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <Box key={key} className="p-6 border border-black">
          Box
        </Box>
      ))}
    </Stack>
  );
}
export function Wrap() {
  return (
    <Stack wrap className="gap-4">
      {[...Array(12).keys()].map((key) => (
        <Box key={key} className="p-6 border border-black">
          Box
        </Box>
      ))}
    </Stack>
  );
}

export default meta;
