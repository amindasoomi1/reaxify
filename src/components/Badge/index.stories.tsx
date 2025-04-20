import type { Meta } from "@storybook/react";
import Badge from ".";
import Stack from "../Stack";

const meta: Meta<typeof Badge> = {
  title: "Component/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function Colors() {
  return (
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
      <Badge color="dark" variant="solid">
        Dark
      </Badge>
      <Badge color="light" variant="solid">
        Light
      </Badge>
    </Stack>
  );
}
export function Variants() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="solid">
        Solid
      </Badge>
      <Badge color="primary" variant="outline">
        Outline
      </Badge>
      <Badge color="primary" variant="soft">
        Soft
      </Badge>
    </Stack>
  );
}
export function Sizes() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="solid" size="sm">
        Small
      </Badge>
      <Badge color="primary" variant="solid" size="md">
        Medium
      </Badge>
      <Badge color="primary" variant="solid" size="lg">
        Large
      </Badge>
    </Stack>
  );
}

export default meta;
