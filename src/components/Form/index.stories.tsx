import type { Meta } from "@storybook/react";
import Form from ".";
import Button from "../Button";
import Card from "../Card";
import InputGroup from "../InputGroup";
import Typography from "../Typography";

const meta: Meta<typeof Form> = {
  title: "Component/Form",
  component: Form,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
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
          <InputGroup>
            <InputGroup.Label>Username</InputGroup.Label>
            <InputGroup.Stack>
              <InputGroup.FormControl />
            </InputGroup.Stack>
          </InputGroup>
          <InputGroup>
            <InputGroup.Label>Password</InputGroup.Label>
            <InputGroup.Stack>
              <InputGroup.FormControl type="password" />
            </InputGroup.Stack>
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
