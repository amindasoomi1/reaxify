import type { Meta } from "@storybook/react";
import Tooltip from ".";
import Box from "../Box";
import Button from "../Button";
import Stack from "../Stack";

const meta: Meta<typeof Tooltip> = {
  title: "Component/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function Default() {
  return (
    <Box>
      <Tooltip title="Tooltip">
        <Button>Button</Button>
      </Tooltip>
    </Box>
  );
}
export function Colors() {
  return (
    <Stack wrap className="items-center gap-4">
      <Tooltip title="Tooltip" color="primary">
        <Button>Primary</Button>
      </Tooltip>
      <Tooltip title="Tooltip" color="secondary">
        <Button>Secondary</Button>
      </Tooltip>
      <Tooltip title="Tooltip" color="success">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip title="Tooltip" color="info">
        <Button>Info</Button>
      </Tooltip>
      <Tooltip title="Tooltip" color="warning">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip title="Tooltip" color="danger">
        <Button>Danger</Button>
      </Tooltip>
      <Tooltip title="Tooltip" color="dark">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip title="Tooltip" color="light">
        <Button>Light</Button>
      </Tooltip>
    </Stack>
  );
}
export function Placement() {
  return (
    <Stack dir="rtl" wrap className="items-center gap-4 py-10">
      <Tooltip title="Top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="End" placement="end">
        <Button>End</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title="Start" placement="start">
        <Button>Start</Button>
      </Tooltip>
    </Stack>
  );
}

export default meta;
