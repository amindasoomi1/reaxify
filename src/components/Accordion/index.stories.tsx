import { accordionVariantArgType } from "@/storybook/argTypes";
import { staticStoryParameters } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Accordion from ".";
import Stack from "../Stack";
import Typography from "../Typography";

const meta = {
  title: "Component/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    variant: "single",
  },
  argTypes: {
    variant: accordionVariantArgType,
    activeKey: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ variant }) => {
    const [singleActive, setSingleActive] = useState<string | null>(null);
    const [multipleActive, setMultipleActive] = useState<string[]>([]);

    if (variant === "multiple") {
      return (
        <Stack direction="column" className="gap-4">
          <Accordion
            variant="multiple"
            activeKey={multipleActive}
            onChange={setMultipleActive}
          >
            <Accordion.Item eventKey="one">
              <Accordion.Toggle>
                <Stack className="w-full">
                  <Typography as="span" className="flex-1">
                    Accordion #1
                  </Typography>
                  <Accordion.Icon />
                </Stack>
              </Accordion.Toggle>
              <Accordion.Collapse>
                <Accordion.Body>
                  <Typography variant="body-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officiis quod labore praesentium perferendis veniam odit esse,
                    in voluptatem. Nobis repellendus reiciendis labore nisi
                    assumenda maiores qui excepturi quo, accusantium quasi.
                  </Typography>
                </Accordion.Body>
              </Accordion.Collapse>
            </Accordion.Item>
            <Accordion.Item eventKey="two">
              <Accordion.Toggle>
                <Stack className="w-full">
                  <Typography as="span" className="flex-1">
                    Accordion #2
                  </Typography>
                  <Accordion.Icon />
                </Stack>
              </Accordion.Toggle>
              <Accordion.Collapse>
                <Accordion.Body>
                  <Typography variant="body-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officiis quod labore praesentium perferendis veniam odit esse,
                    in voluptatem. Nobis repellendus reiciendis labore nisi
                    assumenda maiores qui excepturi quo, accusantium quasi.
                  </Typography>
                </Accordion.Body>
              </Accordion.Collapse>
            </Accordion.Item>
            <Accordion.Item eventKey="three">
              <Accordion.Toggle>
                <Stack className="w-full">
                  <Typography as="span" className="flex-1">
                    Accordion #3
                  </Typography>
                  <Accordion.Icon />
                </Stack>
              </Accordion.Toggle>
              <Accordion.Collapse>
                <Accordion.Body>
                  <Typography variant="body-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officiis quod labore praesentium perferendis veniam odit esse,
                    in voluptatem. Nobis repellendus reiciendis labore nisi
                    assumenda maiores qui excepturi quo, accusantium quasi.
                  </Typography>
                </Accordion.Body>
              </Accordion.Collapse>
            </Accordion.Item>
          </Accordion>
        </Stack>
      );
    }

    return (
      <Stack direction="column" className="gap-4">
        <Accordion
          variant="single"
          activeKey={singleActive}
          onChange={setSingleActive}
        >
          <Accordion.Item eventKey="one">
            <Accordion.Toggle>
              <Stack className="w-full">
                <Typography as="span" className="flex-1">
                  Accordion #1
                </Typography>
                <Accordion.Icon />
              </Stack>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <Accordion.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis quod labore praesentium perferendis veniam odit esse,
                  in voluptatem. Nobis repellendus reiciendis labore nisi
                  assumenda maiores qui excepturi quo, accusantium quasi.
                </Typography>
              </Accordion.Body>
            </Accordion.Collapse>
          </Accordion.Item>
          <Accordion.Item eventKey="two">
            <Accordion.Toggle>
              <Stack className="w-full">
                <Typography as="span" className="flex-1">
                  Accordion #2
                </Typography>
                <Accordion.Icon />
              </Stack>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <Accordion.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis quod labore praesentium perferendis veniam odit esse,
                  in voluptatem. Nobis repellendus reiciendis labore nisi
                  assumenda maiores qui excepturi quo, accusantium quasi.
                </Typography>
              </Accordion.Body>
            </Accordion.Collapse>
          </Accordion.Item>
        </Accordion>
      </Stack>
    );
  },
};

export const Single: Story = {
  parameters: staticStoryParameters,
  render: function Single() {
    const [active, setActive] = useState<string | null>(null);
    return (
      <Stack direction="column" className="gap-4">
        <Accordion activeKey={active} variant="single" onChange={setActive}>
          <Accordion.Item eventKey="one">
            <Accordion.Toggle>
              <Stack className="w-full">
                <Typography as="span" className="flex-1">
                  Accordion #1
                </Typography>
                <Accordion.Icon />
              </Stack>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <Accordion.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis quod labore praesentium perferendis veniam odit esse,
                  in voluptatem. Nobis repellendus reiciendis labore nisi
                  assumenda maiores qui excepturi quo, accusantium quasi.
                </Typography>
              </Accordion.Body>
            </Accordion.Collapse>
          </Accordion.Item>
          <Accordion.Item eventKey="two">
            <Accordion.Toggle>
              <Stack className="w-full">
                <Typography as="span" className="flex-1">
                  Accordion #2
                </Typography>
                <Accordion.Icon />
              </Stack>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <Accordion.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis quod labore praesentium perferendis veniam odit esse,
                  in voluptatem. Nobis repellendus reiciendis labore nisi
                  assumenda maiores qui excepturi quo, accusantium quasi.
                </Typography>
              </Accordion.Body>
            </Accordion.Collapse>
          </Accordion.Item>
        </Accordion>
      </Stack>
    );
  },
};

export const Multiple: Story = {
  parameters: staticStoryParameters,
  render: function Multiple() {
    const [active, setActive] = useState<string[]>([]);
    return (
      <Stack direction="column" className="gap-4">
        <Accordion activeKey={active} variant="multiple" onChange={setActive}>
          <Accordion.Item eventKey="one">
            <Accordion.Toggle>
              <Stack className="w-full">
                <Typography as="span" className="flex-1">
                  Accordion #1
                </Typography>
                <Accordion.Icon />
              </Stack>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <Accordion.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis quod labore praesentium perferendis veniam odit esse,
                  in voluptatem. Nobis repellendus reiciendis labore nisi
                  assumenda maiores qui excepturi quo, accusantium quasi.
                </Typography>
              </Accordion.Body>
            </Accordion.Collapse>
          </Accordion.Item>
          <Accordion.Item eventKey="two">
            <Accordion.Toggle>
              <Stack className="w-full">
                <Typography as="span" className="flex-1">
                  Accordion #2
                </Typography>
                <Accordion.Icon />
              </Stack>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <Accordion.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis quod labore praesentium perferendis veniam odit esse,
                  in voluptatem. Nobis repellendus reiciendis labore nisi
                  assumenda maiores qui excepturi quo, accusantium quasi.
                </Typography>
              </Accordion.Body>
            </Accordion.Collapse>
          </Accordion.Item>
          <Accordion.Item eventKey="three">
            <Accordion.Toggle>
              <Stack className="w-full">
                <Typography as="span" className="flex-1">
                  Accordion #3
                </Typography>
                <Accordion.Icon />
              </Stack>
            </Accordion.Toggle>
            <Accordion.Collapse>
              <Accordion.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Officiis quod labore praesentium perferendis veniam odit esse,
                  in voluptatem. Nobis repellendus reiciendis labore nisi
                  assumenda maiores qui excepturi quo, accusantium quasi.
                </Typography>
              </Accordion.Body>
            </Accordion.Collapse>
          </Accordion.Item>
        </Accordion>
      </Stack>
    );
  },
};
