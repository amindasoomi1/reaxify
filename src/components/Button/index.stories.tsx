import {
  booleanArg,
  buttonSizeArgType,
  buttonVariantArgType,
} from "@/storybook/argTypes";
import { staticStoryParameters } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import { Send2 } from "iconsax-react";
import Button from ".";
import Stack from "../Stack";

const buttonColors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
] as const;

const meta = {
  title: "Component/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "solid",
    size: "md",
    loading: false,
    disabled: false,
    stopPropagation: false,
    preventDefault: false,
    closeModal: false,
    closeDrawer: false,
  },
  argTypes: {
    variant: buttonVariantArgType,
    size: buttonSizeArgType,
    loading: booleanArg("Shows a loading spinner and disables interaction.", false),
    disabled: booleanArg("Disables the button.", false),
    stopPropagation: booleanArg(
      "Calls stopPropagation on the click event.",
      false,
    ),
    preventDefault: booleanArg(
      "Calls preventDefault on the click event.",
      false,
    ),
    closeModal: booleanArg("Closes the parent modal on click.", false),
    closeDrawer: booleanArg("Closes the parent drawer on click.", false),
    type: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ variant, size, loading, disabled }) => (
    <Stack wrap className="items-center gap-4">
      {size === "icon" ? (
        <Button
          color="success"
          variant={variant}
          size="icon"
          loading={loading}
          disabled={disabled}
        >
          <Send2 color="currentColor" variant="Bold" />
        </Button>
      ) : (
        buttonColors.map((color) => (
          <Button
            key={color}
            color={color}
            variant={variant}
            size={size}
            loading={loading}
            disabled={disabled}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))
      )}
    </Stack>
  ),
};

export const Solid: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid">
        Primary
      </Button>
      <Button color="secondary" variant="solid">
        Secondary
      </Button>
      <Button color="success" variant="solid">
        Success
      </Button>
      <Button color="info" variant="solid">
        Info
      </Button>
      <Button color="warning" variant="solid">
        Warning
      </Button>
      <Button color="danger" variant="solid">
        Danger
      </Button>
    </Stack>
  ),
};

export const Outline: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="outline">
        Primary
      </Button>
      <Button color="secondary" variant="outline">
        Secondary
      </Button>
      <Button color="success" variant="outline">
        Success
      </Button>
      <Button color="info" variant="outline">
        Info
      </Button>
      <Button color="warning" variant="outline">
        Warning
      </Button>
      <Button color="danger" variant="outline">
        Danger
      </Button>
    </Stack>
  ),
};

export const Soft: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="soft">
        Primary
      </Button>
      <Button color="secondary" variant="soft">
        Secondary
      </Button>
      <Button color="success" variant="soft">
        Success
      </Button>
      <Button color="info" variant="soft">
        Info
      </Button>
      <Button color="warning" variant="soft">
        Warning
      </Button>
      <Button color="danger" variant="soft">
        Danger
      </Button>
    </Stack>
  ),
};

export const Text: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="text">
        Primary
      </Button>
      <Button color="secondary" variant="text">
        Secondary
      </Button>
      <Button color="success" variant="text">
        Success
      </Button>
      <Button color="info" variant="text">
        Info
      </Button>
      <Button color="warning" variant="text">
        Warning
      </Button>
      <Button color="danger" variant="text">
        Danger
      </Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Button color="success" variant="solid" size="icon">
        <Send2 color="currentColor" variant="Bold" />
      </Button>
      <Button color="success" variant="solid" size="sm">
        Small
      </Button>
      <Button color="success" variant="solid" size="md">
        Medium
      </Button>
      <Button color="success" variant="solid" size="lg">
        Large
      </Button>
    </Stack>
  ),
};

export const Loading: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Button color="success" variant="solid" loading>
        Button
      </Button>
      <Button color="success" variant="outline" loading>
        Button
      </Button>
      <Button color="success" variant="soft" loading>
        Button
      </Button>
      <Button color="success" variant="text" loading>
        Button
      </Button>
    </Stack>
  ),
};
