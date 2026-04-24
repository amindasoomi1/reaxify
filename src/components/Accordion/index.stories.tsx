import type { Meta } from "@storybook/react";
import { useState } from "react";
import Accordion from ".";
import Stack from "../Stack";
import Typography from "../Typography";

const meta: Meta<typeof Accordion> = {
  title: "Component/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function Single() {
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
}
export function Multiple() {
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
}

export default meta;
