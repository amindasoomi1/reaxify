import type { Meta, StoryObj } from "@storybook/react";
import { staticStoryParameters } from "@/storybook/parameters";
import Spacer from ".";
import Stack from "../Stack";

const meta = {
  title: "Component/Spacer",
  component: Spacer,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Stack className="gap-6">
      <div>div 1</div>
      <Spacer />
      <div>div 2</div>
      <div>div 3</div>
    </Stack>
  ),
};

export const Default: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack className="gap-6">
      <div>div 1</div>
      <Spacer />
      <div>div 2</div>
      <div>div 3</div>
    </Stack>
  ),
};
