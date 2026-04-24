import type { Meta } from "@storybook/react";
import Progress from ".";
import Stack from "../Stack";

const meta: Meta<typeof Progress> = {
  title: "Component/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Value() {
  return (
    <Stack direction="column" className="gap-4">
      <Progress value={10} color="primary" />
      <Progress value={20} color="secondary" />
      <Progress value={30} color="success" />
      <Progress value={40} color="info" />
      <Progress value={50} color="warning" />
      <Progress value={60} color="danger" />
      <Progress value={70} color="dark" />
      <Progress value={80} color="light" />
    </Stack>
  );
}
export function Animation() {
  return <Progress animate color="primary" />;
}

export default meta;
