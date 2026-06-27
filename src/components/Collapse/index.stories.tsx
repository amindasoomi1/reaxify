import { numberArg } from "@/storybook/argTypes";
import { staticStoryParameters } from "@/storybook/parameters";
import { useToggle } from "@/hooks";
import type { Meta, StoryObj } from "@storybook/react";
import Collapse from ".";
import Button from "../Button";
import Card from "../Card";
import Typography from "../Typography";

const meta = {
  title: "Component/Collapse",
  component: Collapse,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    duration: 300,
  },
  argTypes: {
    open: { table: { disable: true } },
    duration: numberArg("Animation duration in milliseconds.", 300),
    "data-name": { table: { disable: true } },
  },
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ duration }) => {
    const [open, toggleOpen] = useToggle(false);

    return (
      <div className="space-y-4">
        <Button type="button" onClick={toggleOpen}>
          {open ? "Hide content" : "Show content"}
        </Button>
        <Card>
          <Collapse open={open} duration={duration}>
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
  },
};

export const Controlled: Story = {
  parameters: staticStoryParameters,
  render: function Controlled() {
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
  },
};
