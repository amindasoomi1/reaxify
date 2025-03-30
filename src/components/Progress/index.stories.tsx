import type { Meta } from "@storybook/react";
import Progress from ".";
import Stack from "../Stack";

const meta: Meta<typeof Progress> = {
  title: "Component/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Stack variant="vertical" className="gap-4">
      <Progress value={50} color="primary" />
      <Progress value={50} color="secondary" />
      <Progress value={50} color="success" />
      <Progress value={50} color="info" />
      <Progress value={50} color="warning" />
      <Progress value={50} color="danger" />
      <Progress value={50} color="dark" />
      <Progress value={50} color="light" />
    </Stack>
  );
}

export default meta;
