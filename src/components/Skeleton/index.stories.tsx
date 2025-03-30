import type { Meta } from "@storybook/react";
import { Skeleton } from ".";
import Card from "../Card";

const meta: Meta<typeof Skeleton> = {
  title: "Component/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return (
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
  );
}

export default meta;
