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
  const [active, setActive] = useState("");
  const handleChange = (key: string) => {
    setActive((prev) => (prev === key ? "" : key));
  };
  return (
    <Stack variant="vertical" className="gap-4">
      <Accordion activeKey={active} onChange={handleChange}>
        <Accordion.Item eventKey="one">
          <Accordion.Toggle>
            <Stack>
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
            <Stack>
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
  const handleChange = (key: string) => {
    setActive((prev) => {
      const has = prev.includes(key);
      if (has) return prev.filter((e) => e !== key);
      return [...prev, key];
    });
  };
  return (
    <Stack variant="vertical" className="gap-4">
      <Accordion activeKey={active} onChange={handleChange}>
        <Accordion.Item eventKey="one">
          <Accordion.Toggle>
            <Stack>
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
            <Stack>
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
            <Stack>
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
