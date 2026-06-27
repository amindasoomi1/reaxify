import type { Meta, StoryObj } from "@storybook/react";
import { staticStoryParameters } from "@/storybook/parameters";
import Fill from ".";
import Card from "../Card";
import Stack from "../Stack";

const meta = {
  title: "Component/Fill",
  component: Fill,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Fill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Card>
      <Card.Body>
        <Stack className="w-full gap-6">
          <div>Item 1</div>
          <Fill className="text-center">Filled Item</Fill>
          <div>Item 2</div>
        </Stack>
      </Card.Body>
    </Card>
  ),
};

export const Default: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Card>
      <Card.Body>
        <Stack className="w-full gap-6">
          <div>Item 1</div>
          <Fill className="text-center">Filled Item</Fill>
          <div>Item 2</div>
        </Stack>
      </Card.Body>
    </Card>
  ),
};
