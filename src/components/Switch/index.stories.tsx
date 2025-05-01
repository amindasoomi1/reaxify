import type { Meta } from "@storybook/react";
import { useState } from "react";
import Switch from ".";
import Stack from "../Stack";
import Typography from "../Typography";

const meta: Meta<typeof Switch> = {
  title: "Component/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  const [value, setValue] = useState(false);
  return (
    <Stack className="items-center gap-4">
      <Typography variant="body-2" className="flex-1">
        Checked
      </Typography>
      <Switch checked={value} onChange={setValue} />
    </Stack>
  );
}
export function Color() {
  const [value, setValue] = useState(false);
  return (
    <Stack wrap className="items-center gap-4">
      <Switch checked={value} onChange={setValue} color="primary" />
      <Switch checked={value} onChange={setValue} color="secondary" />
      <Switch checked={value} onChange={setValue} color="success" />
      <Switch checked={value} onChange={setValue} color="info" />
      <Switch checked={value} onChange={setValue} color="warning" />
      <Switch checked={value} onChange={setValue} color="danger" />
      <Switch checked={value} onChange={setValue} color="dark" />
      <Switch checked={value} onChange={setValue} color="light" />
    </Stack>
  );
}
export function Size() {
  const [value, setValue] = useState(false);
  return (
    <Stack wrap className="items-center gap-4">
      <Switch checked={value} onChange={setValue} size="sm" />
      <Switch checked={value} onChange={setValue} size="md" />
      <Switch checked={value} onChange={setValue} size="lg" />
    </Stack>
  );
}
export function Disabled() {
  return (
    <Stack wrap className="items-center gap-4">
      <Switch checked disabled color="primary" />
      <Switch checked color="primary" />
    </Stack>
  );
}

export default meta;
