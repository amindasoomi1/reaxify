import type { Meta } from "@storybook/react";
import InputGroup from ".";

const meta: Meta<typeof InputGroup> = {
  title: "Component/InputGroup",
  component: InputGroup,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <InputGroup>
      <InputGroup.Label>Email address</InputGroup.Label>
      <InputGroup.Stack>
        <InputGroup.Text>@</InputGroup.Text>
        <InputGroup.FormControl />
      </InputGroup.Stack>
    </InputGroup>
  );
}
export default meta;
