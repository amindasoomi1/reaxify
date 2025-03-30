import type { Meta } from "@storybook/react";
import ButtonGroup from ".";
import Button from "../Button";
import Stack from "../Stack";

const meta: Meta<typeof ButtonGroup> = {
  title: "Component/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

const label = "Button";

export function Colors() {
  return (
    <Stack variant="vertical" className="gap-4">
      <ButtonGroup color="primary">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup color="primary">
        <Button>{label}</Button>
        <Button color="secondary">{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  );
}
export function Variants() {
  return (
    <Stack variant="vertical" className="gap-4">
      <ButtonGroup variant="outline">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline">
        <Button>{label}</Button>
        <Button variant="solid">{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  );
}
export function Sizes() {
  return (
    <Stack variant="vertical" className="gap-4">
      <ButtonGroup size="lg">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup size="md">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup size="sm">
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button>{label}</Button>
        <Button size="sm">{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  );
}
export function Loading() {
  return (
    <Stack variant="vertical" className="gap-4">
      <ButtonGroup loading>
        <Button>{label}</Button>
        <Button>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
      <ButtonGroup loading>
        <Button>{label}</Button>
        <Button loading={false}>{label}</Button>
        <Button>{label}</Button>
      </ButtonGroup>
    </Stack>
  );
}
export function Orientations() {
  return (
    <Stack variant="vertical" className="gap-4">
      <ButtonGroup orientation="horizontal">
        <Button color="primary" variant="solid">
          {label}
        </Button>
        <Button color="secondary" variant="solid">
          {label}
        </Button>
        <Button color="success" variant="solid">
          {label}
        </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button color="primary" variant="solid">
          {label}
        </Button>
        <Button color="secondary" variant="solid">
          {label}
        </Button>
        <Button color="success" variant="solid">
          {label}
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export default meta;
