import {
  badgeVariantArgType,
  sizeArgType,
} from "@/storybook/argTypes";
import { staticStoryParameters } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import Badge from ".";
import Stack from "../Stack";

const badgeColors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
] as const;

const meta = {
  title: "Component/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "solid",
    size: "md",
  },
  argTypes: {
    variant: badgeVariantArgType,
    size: sizeArgType,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ variant, size }) => (
    <Stack wrap className="items-center gap-4">
      {badgeColors.map((color) => (
        <Badge key={color} color={color} variant={variant} size={size}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Badge>
      ))}
    </Stack>
  ),
};

export const Solid: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="solid">
        Primary
      </Badge>
      <Badge color="secondary" variant="solid">
        Secondary
      </Badge>
      <Badge color="success" variant="solid">
        Success
      </Badge>
      <Badge color="info" variant="solid">
        Info
      </Badge>
      <Badge color="warning" variant="solid">
        Warning
      </Badge>
      <Badge color="danger" variant="solid">
        Danger
      </Badge>
    </Stack>
  ),
};

export const Outline: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="outline">
        Primary
      </Badge>
      <Badge color="secondary" variant="outline">
        Secondary
      </Badge>
      <Badge color="success" variant="outline">
        Success
      </Badge>
      <Badge color="info" variant="outline">
        Info
      </Badge>
      <Badge color="warning" variant="outline">
        Warning
      </Badge>
      <Badge color="danger" variant="outline">
        Danger
      </Badge>
    </Stack>
  ),
};

export const Soft: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="soft">
        Primary
      </Badge>
      <Badge color="secondary" variant="soft">
        Secondary
      </Badge>
      <Badge color="success" variant="soft">
        Success
      </Badge>
      <Badge color="info" variant="soft">
        Info
      </Badge>
      <Badge color="warning" variant="soft">
        Warning
      </Badge>
      <Badge color="danger" variant="soft">
        Danger
      </Badge>
    </Stack>
  ),
};

export const Sizes: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Badge color="success" variant="solid" size="sm">
        Small
      </Badge>
      <Badge color="success" variant="solid" size="md">
        Medium
      </Badge>
      <Badge color="success" variant="solid" size="lg">
        Large
      </Badge>
    </Stack>
  ),
};
