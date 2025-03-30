import type { Meta } from "@storybook/react";
import Box from ".";
import Typography from "../Typography";

const meta: Meta<typeof Box> = {
  title: "Component/Box",
  component: Box,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Box>
      <Typography>This is a normal DIV</Typography>
    </Box>
  );
}

export default meta;
