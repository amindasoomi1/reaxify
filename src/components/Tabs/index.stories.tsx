import type { Meta, StoryObj } from "@storybook/react";
import { asStaticStory } from "@/storybook/parameters";
import { useState } from "react";
import Tabs from ".";
import Stack from "../Stack";
import Typography from "../Typography";

const meta = {
  title: "Component/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    active: "basic-info",
  },
  argTypes: {
    active: {
      description: "Currently active tab key.",
      table: { defaultValue: { summary: "basic-info" } },
      options: ["basic-info", "contact-info", "notes"],
      control: { type: "select" },
    },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ active: activeArg }) => {
    const [active, setActive] = useState(activeArg ?? "basic-info");
    return (
      <div className="w-full space-y-4">
        <Tabs active={active} onChange={setActive}>
          <Tabs.ButtonGroup>
            <Tabs.Indicator />
            <Tabs.Button eventKey="basic-info">Basic info</Tabs.Button>
            <Tabs.Button eventKey="contact-info">Contact info</Tabs.Button>
            <Tabs.Button eventKey="notes">Notes</Tabs.Button>
          </Tabs.ButtonGroup>
          <Tabs.Item eventKey="basic-info">
            <Stack direction="column" className="gap-4">
              <Typography variant="heading-6">Basic info</Typography>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                aliquam delectus nulla sint ipsam repudiandae fugiat error?
                Consequatur facilis odio tempora natus unde molestias voluptatibus
                quasi, aliquam eius labore incidunt?
              </Typography>
            </Stack>
          </Tabs.Item>
          <Tabs.Item eventKey="contact-info">
            <Stack direction="column" className="gap-4">
              <Typography variant="heading-6">Contact info</Typography>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                aliquam delectus nulla sint ipsam repudiandae fugiat error?
                Consequatur facilis odio tempora natus unde molestias voluptatibus
                quasi, aliquam eius labore incidunt?
              </Typography>
            </Stack>
          </Tabs.Item>
          <Tabs.Item eventKey="notes">
            <Stack direction="column" className="gap-4">
              <Typography variant="heading-6">Notes</Typography>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                aliquam delectus nulla sint ipsam repudiandae fugiat error?
                Consequatur facilis odio tempora natus unde molestias voluptatibus
                quasi, aliquam eius labore incidunt?
              </Typography>
            </Stack>
          </Tabs.Item>
        </Tabs>
      </div>
    );
  },
};

export const Default = asStaticStory(function Default() {
    const [active, setActive] = useState("basic-info");
    return (
      <div className="w-full space-y-4">
        <Tabs active={active} onChange={setActive}>
          <Tabs.ButtonGroup>
            <Tabs.Indicator />
            <Tabs.Button eventKey="basic-info">Basic info</Tabs.Button>
            <Tabs.Button eventKey="contact-info">Contact info</Tabs.Button>
            <Tabs.Button eventKey="notes">Notes</Tabs.Button>
          </Tabs.ButtonGroup>
          <Tabs.Item eventKey="basic-info">
            <Stack direction="column" className="gap-4">
              <Typography variant="heading-6">Basic info</Typography>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                aliquam delectus nulla sint ipsam repudiandae fugiat error?
                Consequatur facilis odio tempora natus unde molestias voluptatibus
                quasi, aliquam eius labore incidunt?
              </Typography>
            </Stack>
          </Tabs.Item>
          <Tabs.Item eventKey="contact-info">
            <Stack direction="column" className="gap-4">
              <Typography variant="heading-6">Contact info</Typography>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                aliquam delectus nulla sint ipsam repudiandae fugiat error?
                Consequatur facilis odio tempora natus unde molestias voluptatibus
                quasi, aliquam eius labore incidunt?
              </Typography>
            </Stack>
          </Tabs.Item>
          <Tabs.Item eventKey="notes">
            <Stack direction="column" className="gap-4">
              <Typography variant="heading-6">Notes</Typography>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                aliquam delectus nulla sint ipsam repudiandae fugiat error?
                Consequatur facilis odio tempora natus unde molestias voluptatibus
                quasi, aliquam eius labore incidunt?
              </Typography>
            </Stack>
          </Tabs.Item>
        </Tabs>
      </div>
    );
  });