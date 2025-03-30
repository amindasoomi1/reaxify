import type { Meta } from "@storybook/react";
import Card from ".";
import Button from "../Button";
import Stack from "../Stack";
import Typography from "../Typography";

const meta: Meta<typeof Card> = {
  title: "Component/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Stack variant="vertical" className="lg:flex-row gap-4">
      {[...Array(3).keys()].map((key) => (
        <Card key={key} className="lg:flex-1">
          <Card.Header>
            <Typography variant="heading-6">Card header</Typography>
          </Card.Header>
          <Card.Body>
            <Typography variant="body-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur atque debitis fugiat voluptatum facere, voluptate
              sapiente accusantium, dolor dicta mollitia corporis quas possimus
              omnis minus sequi, recusandae earum deserunt? Doloremque.
            </Typography>
          </Card.Body>
          <Card.Footer className="flex items-center *:flex-1 gap-4">
            <Button type="button" variant="outline" color="danger">
              Cancel
            </Button>
            <Button type="button" variant="solid" color="success">
              Accept
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Stack>
  );
}

export default meta;
