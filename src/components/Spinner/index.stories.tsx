import { booleanArg, colorArgType, sizeArgType } from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import Spinner from ".";
import Stack from "../Stack";

const spinnerColors = [
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
  title: "Component/Spinner",
  component: Spinner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    color: "primary",
    size: "md",
    inheritColor: false,
  },
  argTypes: {
    color: colorArgType,
    size: sizeArgType,
    inheritColor: booleanArg(
      "Uses the current text color instead of a semantic color.",
      false,
    ),
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ color, size, inheritColor }) => (
    <Stack direction="row" className="items-center gap-4">
      {inheritColor ? (
        <Spinner color={color} size={size} inheritColor />
      ) : (
        spinnerColors.map((itemColor) => (
          <Spinner key={itemColor} color={itemColor} size={size} />
        ))
      )}
    </Stack>
  ),
};

export const Default = asStaticStory(() => <Spinner />);

export const Color = asStaticStory(() => (
    <Stack direction="row" className="gap-4">
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="info" />
      <Spinner color="warning" />
      <Spinner color="danger" />
      <Spinner color="dark" />
      <Spinner color="light" />
    </Stack>
  ));

export const Size = asStaticStory(() => (
    <Stack direction="row" className="items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Stack>
  ));