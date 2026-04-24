import type { Meta } from "@storybook/react";
import { Send2 } from "iconsax-react";
import Button from ".";
import Stack from "../Stack";

const meta: Meta<typeof Button> = {
  title: "Component/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;
export function Solid() {
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
    </Stack>
  );
}
export function Outline() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="outline">
        Primary
      </Button>
      <Button color="secondary" variant="outline">
        Secondary
      </Button>
      <Button color="success" variant="outline">
        Success
      </Button>
      <Button color="info" variant="outline">
        Info
      </Button>
      <Button color="warning" variant="outline">
        Warning
      </Button>
      <Button color="danger" variant="outline">
        Danger
      </Button>
    </Stack>
  );
}
export function Soft() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="soft">
        Primary
      </Button>
      <Button color="secondary" variant="soft">
        Secondary
      </Button>
      <Button color="success" variant="soft">
        Success
      </Button>
      <Button color="info" variant="soft">
        Info
      </Button>
      <Button color="warning" variant="soft">
        Warning
      </Button>
      <Button color="danger" variant="soft">
        Danger
      </Button>
    </Stack>
  );
}
export function Text() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="primary" variant="text">
        Primary
      </Button>
      <Button color="secondary" variant="text">
        Secondary
      </Button>
      <Button color="success" variant="text">
        Success
      </Button>
      <Button color="info" variant="text">
        Info
      </Button>
      <Button color="warning" variant="text">
        Warning
      </Button>
      <Button color="danger" variant="text">
        Danger
      </Button>
    </Stack>
  );
}
export function Sizes() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="success" variant="solid" size="icon">
        <Send2 color="currentColor" variant="Bold" />
      </Button>
      <Button color="success" variant="solid" size="sm">
        Small
      </Button>
      <Button color="success" variant="solid" size="md">
        Medium
      </Button>
      <Button color="success" variant="solid" size="lg">
        Large
      </Button>
    </Stack>
  );
}
export function Loading() {
  return (
    <Stack wrap className="items-center gap-4">
      <Button color="success" variant="solid" loading>
        Button
      </Button>
      <Button color="success" variant="outline" loading>
        Button
      </Button>
      <Button color="success" variant="text" loading>
        Button
      </Button>
    </Stack>
  );
}

export default meta;
