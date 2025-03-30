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

const label = "Button";

export function Colors() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid">
        {label}
      </Button>
      <Button color="secondary" variant="solid">
        {label}
      </Button>
      <Button color="success" variant="solid">
        {label}
      </Button>
      <Button color="info" variant="solid">
        {label}
      </Button>
      <Button color="warning" variant="solid">
        {label}
      </Button>
      <Button color="danger" variant="solid">
        {label}
      </Button>
      <Button color="dark" variant="solid">
        {label}
      </Button>
      <Button color="light" variant="solid">
        {label}
      </Button>
    </Stack>
  );
}
export function Variants() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid">
        {label}
      </Button>
      <Button color="primary" variant="outline">
        {label}
      </Button>
      <Button color="primary" variant="text">
        {label}
      </Button>
    </Stack>
  );
}
export function Sizes() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid" size="sm">
        {label}
      </Button>
      <Button color="primary" variant="solid" size="md">
        {label}
      </Button>
      <Button color="primary" variant="solid" size="lg">
        {label}
      </Button>
    </Stack>
  );
}
export function Loading() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="solid" loading>
        {label}
      </Button>
      <Button color="primary" variant="outline" loading>
        {label}
      </Button>
      <Button color="primary" variant="text" loading>
        {label}
      </Button>
    </Stack>
  );
}

export default meta;
