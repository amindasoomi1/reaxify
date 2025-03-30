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

const label = "Badge";

export function Colors() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="solid">
        {label}
      </Badge>
      <Badge color="secondary" variant="solid">
        {label}
      </Badge>
      <Badge color="success" variant="solid">
        {label}
      </Badge>
      <Badge color="info" variant="solid">
        {label}
      </Badge>
      <Badge color="warning" variant="solid">
        {label}
      </Badge>
      <Badge color="danger" variant="solid">
        {label}
      </Badge>
      <Badge color="dark" variant="solid">
        {label}
      </Badge>
      <Badge color="light" variant="solid">
        {label}
      </Badge>
    </Stack>
  );
}
export function Variants() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="solid">
        {label}
      </Badge>
      <Badge color="primary" variant="outline">
        {label}
      </Badge>
      <Badge color="primary" variant="soft">
        {label}
      </Badge>
    </Stack>
  );
}
export function Sizes() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="solid" size="sm">
        {label}
      </Badge>
      <Badge color="primary" variant="solid" size="md">
        {label}
      </Badge>
      <Badge color="primary" variant="solid" size="lg">
        {label}
      </Badge>
    </Stack>
  );
}

export default meta;
