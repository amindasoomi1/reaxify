import type { Meta } from "@storybook/react";
import { default as Spacer } from ".";
import Stack from "../Stack";

const meta: Meta<typeof Spacer> = {
  title: "Component/Spacer",
  component: Spacer,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Stack className="gap-6">
      <div>div 1</div>
      <Spacer />
      <div>div 2</div>
      <div>div 3</div>
    </Stack>
  );
}

export default meta;
