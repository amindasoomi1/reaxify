import type { Meta } from "@storybook/react";
import { useState } from "react";
import Tabs from ".";
import Box from "../Box";
import ButtonGroup from "../ButtonGroup";
import Stack from "../Stack";
import Typography from "../Typography";

const meta: Meta<typeof Tabs> = {
  title: "Component/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function Default() {
  const [active, setActive] = useState("basic-info");
  return (
    <Box className="w-full space-y-4">
      <Tabs active={active} onChange={setActive}>
        <ButtonGroup>
          <Tabs.Indicator />
          <Tabs.Button eventKey="basic-info">Basic info</Tabs.Button>
          <Tabs.Button eventKey="contact-info">Contact info</Tabs.Button>
          <Tabs.Button eventKey="notes">Notes</Tabs.Button>
        </ButtonGroup>
        <Tabs.Item eventKey="basic-info">
          <Stack variant="vertical" className="gap-4">
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
          <Stack variant="vertical" className="gap-4">
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
          <Stack variant="vertical" className="gap-4">
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
    </Box>
  );
}

export default meta;
