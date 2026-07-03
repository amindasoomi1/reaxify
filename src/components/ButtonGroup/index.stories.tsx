import {
  booleanArg,
  buttonGroupOrientationArgType,
  buttonSizeArgType,
  buttonVariantArgType,
  colorArgType,
} from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import ButtonGroup from ".";
import Button from "../Button";
import Stack from "../Stack";

const label = "Button";

const meta = {
  title: "Component/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    color: "primary",
    variant: "solid",
    size: "md",
    loading: false,
    orientation: "horizontal",
  },
  argTypes: {
    color: colorArgType,
    variant: buttonVariantArgType,
    size: buttonSizeArgType,
    loading: booleanArg("Shows loading state on all buttons.", false),
    orientation: buttonGroupOrientationArgType,
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ orientation, variant, color, size, loading }) => (
    <ButtonGroup
      orientation={orientation}
      variant={variant}
      color={color}
      size={size}
      loading={loading}
    >
      <Button color="primary" variant="solid">
        {label}
      </Button>
      <Button color="secondary" variant="solid">
        {label}
      </Button>
      <Button color="success" variant="solid">
        {label}
      </Button>
    </ButtonGroup>
  ),
};

export const Colors = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <ButtonGroup color="primary">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup color="primary">
        <Button>{label}</Button>
        <Button color="secondary">{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  ));

export const Variants = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <ButtonGroup variant="outline">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline">
        <Button>{label}</Button>
        <Button variant="solid">{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  ));

export const Sizes = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <ButtonGroup size="lg">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup size="md">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup size="sm">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button>{label}</Button>
        <Button size="sm">{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  ));

export const Loading = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <ButtonGroup loading>
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup loading>
        <Button>{label}</Button>
        <Button loading={false}>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  ));

export const Orientations = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <ButtonGroup orientation="horizontal">
        <Button color="primary" variant="solid">
          {label}
        </Button>
        <Button color="secondary" variant="solid">
          {label}
        </Button>
        <Button color="success" variant="solid">
          {label}
        </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button color="primary" variant="solid">
          {label}
        </Button>
        <Button color="secondary" variant="solid">
          {label}
        </Button>
        <Button color="success" variant="solid">
          {label}
        </Button>
      </ButtonGroup>
    </Stack>
  ));