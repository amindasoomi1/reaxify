import type { Meta, StoryObj } from "@storybook/react";
import { staticStoryParameters } from "@/storybook/parameters";
import InputGroup from ".";
import Stack from "../Stack";

const meta = {
  title: "Component/InputGroup",
  component: InputGroup,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Stack direction="column" className="gap-4">
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
  ),
};

export const Default: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack direction="column" className="gap-4">
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
  ),
};
