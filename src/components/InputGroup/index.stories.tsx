import type { Meta } from "@storybook/react";
import InputGroup from ".";
import Stack from "../Stack";

const meta: Meta<typeof InputGroup> = {
  title: "Component/InputGroup",
  component: InputGroup,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Stack variant="vertical" className="gap-4">
      <InputGroup>
        <InputGroup.Label>Email address</InputGroup.Label>
        <InputGroup.Stack>
          <InputGroup.Text>@</InputGroup.Text>
          <InputGroup.FormControl />
        </InputGroup.Stack>
      </InputGroup>
      <InputGroup>
        <InputGroup.Label>Description</InputGroup.Label>
        <InputGroup.Stack>
          <InputGroup.FormControl as="textarea" />
        </InputGroup.Stack>
      </InputGroup>
    </Stack>
  );
}
export default meta;
