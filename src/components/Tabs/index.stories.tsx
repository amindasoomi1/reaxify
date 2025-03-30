import type { Meta } from "@storybook/react";
import { useState } from "react";
import { TabButton, TabIndicator, TabItem, Tabs } from ".";
import { Box } from "../Box";
import { ButtonGroup } from "../ButtonGroup";
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
          <TabIndicator />
          <TabButton eventKey="basic-info">Basic info</TabButton>
          <TabButton eventKey="contact-info">Contact info</TabButton>
          <TabButton eventKey="notes">Notes</TabButton>
        </ButtonGroup>
        <TabItem eventKey="basic-info">
          <Stack variant="vertical" className="gap-4">
            <Typography variant="heading-6">Basic info</Typography>
            <Typography variant="body-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              aliquam delectus nulla sint ipsam repudiandae fugiat error?
              Consequatur facilis odio tempora natus unde molestias voluptatibus
              quasi, aliquam eius labore incidunt?
            </Typography>
          </Stack>
        </TabItem>
        <TabItem eventKey="contact-info">
          <Stack variant="vertical" className="gap-4">
            <Typography variant="heading-6">Contact info</Typography>
            <Typography variant="body-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              aliquam delectus nulla sint ipsam repudiandae fugiat error?
              Consequatur facilis odio tempora natus unde molestias voluptatibus
              quasi, aliquam eius labore incidunt?
            </Typography>
          </Stack>
        </TabItem>
        <TabItem eventKey="notes">
          <Stack variant="vertical" className="gap-4">
            <Typography variant="heading-6">Notes</Typography>
            <Typography variant="body-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              aliquam delectus nulla sint ipsam repudiandae fugiat error?
              Consequatur facilis odio tempora natus unde molestias voluptatibus
              quasi, aliquam eius labore incidunt?
            </Typography>
          </Stack>
        </TabItem>
      </Tabs>
    </Box>
  );
}

export default meta;
