import type { Meta } from "@storybook/react";
import Fill from ".";
import Card from "../Card";
import Stack from "../Stack";

const meta: Meta<typeof Fill> = {
  title: "Component/Fill",
  component: Fill,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Card>
      <Card.Body>
        <Stack className="w-full gap-6">
          <div>Item 1</div>
          <Fill className="text-center">Filled Item</Fill>
          <div>Item 2</div>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default meta;
