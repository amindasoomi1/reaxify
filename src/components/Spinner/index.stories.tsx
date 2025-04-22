import type { Meta } from "@storybook/react";
import Spinner from ".";
import Stack from "../Stack";

const meta: Meta<typeof Spinner> = {
  title: "Component/Spinner",
  component: Spinner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return <Spinner />;
}
export function Color() {
  return (
    <Stack variant="horizontal" className="gap-4">
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="info" />
      <Spinner color="warning" />
      <Spinner color="danger" />
      <Spinner color="dark" />
      <Spinner color="light" />
    </Stack>
  );
}
export function Size() {
  return (
    <Stack variant="horizontal" className="items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Stack>
  );
}

export default meta;
