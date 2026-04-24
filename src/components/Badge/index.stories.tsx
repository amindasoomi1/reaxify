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

export function Solid() {
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
    </Stack>
  );
}
export function Outline() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="outline">
        Primary
      </Badge>
      <Badge color="secondary" variant="outline">
        Secondary
      </Badge>
      <Badge color="success" variant="outline">
        Success
      </Badge>
      <Badge color="info" variant="outline">
        Info
      </Badge>
      <Badge color="warning" variant="outline">
        Warning
      </Badge>
      <Badge color="danger" variant="outline">
        Danger
      </Badge>
    </Stack>
  );
}
export function Soft() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="primary" variant="soft">
        Primary
      </Badge>
      <Badge color="secondary" variant="soft">
        Secondary
      </Badge>
      <Badge color="success" variant="soft">
        Success
      </Badge>
      <Badge color="info" variant="soft">
        Info
      </Badge>
      <Badge color="warning" variant="soft">
        Warning
      </Badge>
      <Badge color="danger" variant="soft">
        Danger
      </Badge>
    </Stack>
  );
}
export function Sizes() {
  return (
    <Stack wrap className="items-center gap-4">
      <Badge color="success" variant="solid" size="sm">
        Small
      </Badge>
      <Badge color="success" variant="solid" size="md">
        Medium
      </Badge>
      <Badge color="success" variant="solid" size="lg">
        Large
      </Badge>
    </Stack>
  );
}

export default meta;
