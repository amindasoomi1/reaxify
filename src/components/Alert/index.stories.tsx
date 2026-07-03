import { alertVariantArgType } from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import {
  CloseCircle,
  InfoCircle,
  Information,
  TickCircle,
} from "iconsax-react";
import Alert from ".";
import Button from "../Button";
import Stack from "../Stack";

const alertItems = [
  {
    color: "success" as const,
    title: "Success",
    description: "This is a success alert.",
    icon: TickCircle,
  },
  {
    color: "info" as const,
    title: "Info",
    description: "This is an info alert.",
    icon: InfoCircle,
  },
  {
    color: "warning" as const,
    title: "Warning",
    description: "This is a warning alert.",
    icon: Information,
  },
  {
    color: "danger" as const,
    title: "Danger",
    description: "This is a danger alert.",
    icon: CloseCircle,
  },
];

const meta = {
  title: "Component/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    variant: "solid",
  },
  argTypes: {
    variant: alertVariantArgType,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ variant }) => (
    <Stack direction="column" className="gap-4">
      {alertItems.map((item) => {
        const Icon = item.icon;
        return (
          <Alert key={item.color} color={item.color} variant={variant}>
            <Alert.Icon>
              <Icon color="currentColor" variant="Linear" />
            </Alert.Icon>
            <Alert.Content>
              <Alert.Title>{item.title}</Alert.Title>
              <Alert.Description>{item.description}</Alert.Description>
            </Alert.Content>
            <Alert.Action>
              <Button type="button" size="icon">
                <CloseCircle color="currentColor" variant="Linear" />
              </Button>
            </Alert.Action>
          </Alert>
        );
      })}
    </Stack>
  ),
};

export const Soft = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <Alert color="success" variant="soft">
        <Alert.Icon>
          <TickCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>This is a success alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="info" variant="soft">
        <Alert.Icon>
          <InfoCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>This is an info alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="warning" variant="soft">
        <Alert.Icon>
          <Information color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>This is a warning alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="danger" variant="soft">
        <Alert.Icon>
          <CloseCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Danger</Alert.Title>
          <Alert.Description>This is a danger alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>
    </Stack>
  ));

export const Outline = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <Alert color="success" variant="outline">
        <Alert.Icon>
          <TickCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>This is a success alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="info" variant="outline">
        <Alert.Icon>
          <InfoCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>This is an info alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="warning" variant="outline">
        <Alert.Icon>
          <Information color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>This is a warning alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="danger" variant="outline">
        <Alert.Icon>
          <CloseCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Danger</Alert.Title>
          <Alert.Description>This is a danger alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>
    </Stack>
  ));

export const Solid = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      <Alert color="success" variant="solid">
        <Alert.Icon>
          <TickCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>This is a success alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="info" variant="solid">
        <Alert.Icon>
          <InfoCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>This is an info alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="warning" variant="solid">
        <Alert.Icon>
          <Information color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>This is a warning alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>

      <Alert color="danger" variant="solid">
        <Alert.Icon>
          <CloseCircle color="currentColor" variant="Linear" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Danger</Alert.Title>
          <Alert.Description>This is a danger alert.</Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button type="button" size="icon">
            <CloseCircle color="currentColor" variant="Linear" />
          </Button>
        </Alert.Action>
      </Alert>
    </Stack>
  ));