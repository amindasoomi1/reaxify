import type { Meta } from "@storybook/react";
import { useState } from "react";
import Form from ".";
import Button from "../Button";
import Card from "../Card";
import {
  FormControl,
  HelperText,
  InputGroup,
  InputGroupLabel,
  InputGroupStack,
} from "../InputGroup";
import Typography from "../Typography";

const meta: Meta<typeof Form> = {
  title: "Component/Form",
  component: Form,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const submit = () => {
    // do something
  };
  const error = () => {
    // do something
  };
  return (
    <Form onSubmit={submit} onError={error} className="w-full max-w-sm mx-auto">
      <Card>
        <Card.Header>
          <Typography variant="heading-6">Login</Typography>
        </Card.Header>
        <Card.Body className="space-y-4">
          <InputGroup
            value={username}
            setValue={setUsername}
            rules={[
              (val) => Boolean(String(val ?? "").length) || "Field is required",
            ]}
          >
            <InputGroupLabel>Username</InputGroupLabel>
            <InputGroupStack>
              <FormControl />
            </InputGroupStack>
            <HelperText />
          </InputGroup>
          <InputGroup
            value={password}
            setValue={setPassword}
            rules={[
              (val) => Boolean(String(val ?? "").length) || "Field is required",
              (val) =>
                String(val ?? "").length >= 8 ||
                "The length of the value must be greater than 8",
            ]}
          >
            <InputGroupLabel>Password</InputGroupLabel>
            <InputGroupStack>
              <FormControl type="password" />
            </InputGroupStack>
            <HelperText />
          </InputGroup>
        </Card.Body>
        <Card.Footer className="flex items-center *:flex-1 gap-4">
          <Button type="button" variant="outline" color="danger">
            Cancel
          </Button>
          <Button type="submit" variant="solid" color="success">
            Submit
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}

export default meta;
