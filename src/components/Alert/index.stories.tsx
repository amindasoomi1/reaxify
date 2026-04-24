import type { Meta } from "@storybook/react";
import {
  CloseCircle,
  InfoCircle,
  Information,
  TickCircle,
} from "iconsax-react";
import Alert from ".";
import Button from "../Button";
import Stack from "../Stack";

const meta: Meta<typeof Alert> = {
  title: "Component/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Soft() {
  return (
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
  );
}
export function Outline() {
  return (
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
  );
}
export function Solid() {
  return (
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
  );
}

export default meta;
