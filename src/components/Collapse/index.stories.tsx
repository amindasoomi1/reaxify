import { useToggle } from "@/hooks";
import type { Meta } from "@storybook/react";
import Collapse from ".";
import Button from "../Button";
import Card from "../Card";
import Typography from "../Typography";

const meta: Meta<typeof Collapse> = {
  title: "Component/Collapse",
  component: Collapse,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Controlled() {
  const [open, toggleOpen] = useToggle(false);

  return (
    <div className="space-y-4">
      <Button type="button" onClick={toggleOpen}>
        {open ? "Hide content" : "Show content"}
      </Button>
      <Card>
        <Collapse open={open}>
          <Collapse.Content className="p-10">
            <Typography variant="body-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              quod labore praesentium perferendis veniam odit esse, in
              voluptatem. Nobis repellendus reiciendis labore nisi assumenda
              maiores qui excepturi quo, accusantium quasi.
            </Typography>
          </Collapse.Content>
        </Collapse>
      </Card>
    </div>
  );
}

export default meta;
