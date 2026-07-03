import type { Meta, StoryObj } from "@storybook/react";
import { asStaticStory } from "@/storybook/parameters";
import Skeleton from ".";
import Card from "../Card";

const meta = {
  title: "Component/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Card className="max-w-xs mx-auto">
      <Card.Header className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="flex-1 w-auto h-7" />
      </Card.Header>
      <Card.Body className="space-y-1">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-1/2 h-4" />
      </Card.Body>
      <Card.Footer className="flex items-center *:flex-1 gap-4">
        <Skeleton className="w-auto h-10" />
        <Skeleton className="w-auto h-10" />
      </Card.Footer>
    </Card>
  ),
};

export const Default = asStaticStory(() => (
    <Card className="max-w-xs mx-auto">
      <Card.Header className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="flex-1 w-auto h-7" />
      </Card.Header>
      <Card.Body className="space-y-1">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-1/2 h-4" />
      </Card.Body>
      <Card.Footer className="flex items-center *:flex-1 gap-4">
        <Skeleton className="w-auto h-10" />
        <Skeleton className="w-auto h-10" />
      </Card.Footer>
    </Card>
  ));