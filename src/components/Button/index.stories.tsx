import type { Meta } from "@storybook/react";
import Button from ".";
import Stack from "../Stack";

const meta: Meta<typeof Button> = {
  title: "Component/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function Colors() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid">
        Primary
      </Button>
      <Button color="secondary" variant="solid">
        Secondary
      </Button>
      <Button color="success" variant="solid">
        Success
      </Button>
      <Button color="info" variant="solid">
        Info
      </Button>
      <Button color="warning" variant="solid">
        Warning
      </Button>
      <Button color="danger" variant="solid">
        Danger
      </Button>
      <Button color="dark" variant="solid">
        Dark
      </Button>
      <Button color="light" variant="solid">
        Light
      </Button>
    </Stack>
  );
}
export function Variants() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid">
        Solid
      </Button>
      <Button color="primary" variant="outline">
        Outline
      </Button>
      <Button color="primary" variant="text">
        Text
      </Button>
    </Stack>
  );
}
export function Sizes() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid" size="sm">
        Small
      </Button>
      <Button color="primary" variant="solid" size="md">
        Medium
      </Button>
      <Button color="primary" variant="solid" size="lg">
        Large
      </Button>
    </Stack>
  );
}
export function Loading() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid" loading>
        Button
      </Button>
      <Button color="primary" variant="outline" loading>
        Button
      </Button>
      <Button color="primary" variant="text" loading>
        Button
      </Button>
    </Stack>
  );
}

export default meta;
