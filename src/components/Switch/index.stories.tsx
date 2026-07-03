import {
  booleanArg,
  colorArgType,
  sizeArgType,
} from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Switch from ".";
import Stack from "../Stack";
import Typography from "../Typography";

const meta = {
  title: "Component/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    checked: false,
    disabled: false,
    color: "primary",
    size: "md",
  },
  argTypes: {
    checked: booleanArg("Whether the switch is on.", false),
    disabled: booleanArg("Disables the switch.", false),
    color: colorArgType,
    size: sizeArgType,
    onChange: { table: { disable: true } },
    inputProps: { table: { disable: true } },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ checked: checkedArg, ...args }) => {
    const [checked, setChecked] = useState(checkedArg ?? false);
    return (
      <Stack className="items-center gap-4">
        <Typography variant="body-2" className="flex-1">
          Checked
        </Typography>
        <Switch {...args} checked={checked} onChange={setChecked} />
      </Stack>
    );
  },
};

export const Default = asStaticStory(function Default() {
    const [value, setValue] = useState(false);
    return (
      <Stack className="items-center gap-4">
        <Typography variant="body-2" className="flex-1">
          Checked
        </Typography>
        <Switch checked={value} onChange={setValue} />
      </Stack>
    );
  });

export const Color = asStaticStory(function Color() {
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
  });

export const Size = asStaticStory(function Size() {
    const [value, setValue] = useState(false);
    return (
      <Stack wrap className="items-center gap-4">
        <Switch checked={value} onChange={setValue} size="sm" />
        <Switch checked={value} onChange={setValue} size="md" />
        <Switch checked={value} onChange={setValue} size="lg" />
      </Stack>
    );
  });

export const Disabled = asStaticStory(() => (
    <Stack wrap className="items-center gap-4">
      <Switch checked disabled color="primary" />
      <Switch checked color="primary" />
    </Stack>
  ));