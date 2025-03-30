import type { Meta } from "@storybook/react";
import {
  FormControl,
  InputGroup,
  InputGroupLabel,
  InputGroupStack,
  InputGroupText,
} from ".";
import Stack from "../Stack";

const meta: Meta<typeof InputGroup> = {
  title: "Component/InputGroup",
  component: InputGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <InputGroup>
      <InputGroupLabel>Email address</InputGroupLabel>
      <InputGroupStack>
        <InputGroupText>@</InputGroupText>
        <FormControl />
      </InputGroupStack>
    </InputGroup>
  );
}
export function Size() {
  return (
    <Stack variant="vertical" className="gap-4">
      <InputGroup size="sm">
        <InputGroupLabel>Email address</InputGroupLabel>
        <InputGroupStack>
          <InputGroupText>@</InputGroupText>
          <FormControl />
        </InputGroupStack>
      </InputGroup>
      <InputGroup size="md">
        <InputGroupLabel>Email address</InputGroupLabel>
        <InputGroupStack>
          <InputGroupText>@</InputGroupText>
          <FormControl />
        </InputGroupStack>
      </InputGroup>
      <InputGroup size="lg">
        <InputGroupLabel>Email address</InputGroupLabel>
        <InputGroupStack>
          <InputGroupText>@</InputGroupText>
          <FormControl />
        </InputGroupStack>
      </InputGroup>
      <InputGroup>
        <InputGroupLabel>Textarea</InputGroupLabel>
        <InputGroupStack>
          <FormControl multiline rows={5} />
        </InputGroupStack>
      </InputGroup>
    </Stack>
  );
}
export default meta;
