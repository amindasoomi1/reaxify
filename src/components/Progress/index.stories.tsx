import {
  booleanArg,
  colorArgType,
  rangeArg,
} from "@/storybook/argTypes";
import { staticStoryParameters } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import Progress from ".";
import Stack from "../Stack";

const progressColors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "dark",
  "light",
] as const;

const meta = {
  title: "Component/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    color: "primary",
    value: 60,
  },
  argTypes: {
    color: colorArgType,
    value: rangeArg("Progress value from 0 to 100.", 60, 0, 100, 5),
    animate: booleanArg("Indeterminate loading animation.", false),
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ color, value, animate }) =>
    animate ? (
      <Progress animate color={color} />
    ) : (
      <Stack direction="column" className="gap-4">
        {progressColors.map((itemColor, index) => (
          <Progress
            key={itemColor}
            value={value ?? (index + 1) * 10}
            color={itemColor}
          />
        ))}
      </Stack>
    ),
};

export const Value: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack direction="column" className="gap-4">
      <Progress value={10} color="primary" />
      <Progress value={20} color="secondary" />
      <Progress value={30} color="success" />
      <Progress value={40} color="info" />
      <Progress value={50} color="warning" />
      <Progress value={60} color="danger" />
      <Progress value={70} color="dark" />
      <Progress value={80} color="light" />
    </Stack>
  ),
};

export const Animation: Story = {
  parameters: staticStoryParameters,
  render: () => <Progress animate color="primary" />,
};
