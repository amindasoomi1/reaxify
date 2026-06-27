import type { Meta } from "@storybook/react";
import { CallCalling, More, Profile, Setting2, Trash } from "iconsax-react";
import { useState } from "react";
import List from ".";
import Button from "../Button";
import Typography from "../Typography";

const meta: Meta<typeof List> = {
  title: "Component/List",
  component: List,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <List className="max-w-sm rounded border border-border">
      <List.Item>
        <List.Icon>
          <Profile color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2" className="font-medium">
            John Doe
          </Typography>
          <Typography variant="body-3" className="text-dark/60">
            +1 234 567 890
          </Typography>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon>
          <Setting2 color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2">Settings</Typography>
        </List.Content>
      </List.Item>
    </List>
  );
}

export function Divided() {
  return (
    <List divided className="max-w-sm rounded border border-border">
      <List.Item>
        <List.Icon>
          <Profile color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2" className="font-medium">
            John Doe
          </Typography>
          <Typography variant="body-3" className="text-dark/60">
            +1 234 567 890
          </Typography>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon>
          <Setting2 color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2">Settings</Typography>
        </List.Content>
      </List.Item>
    </List>
  );
}

export function Interactive() {
  const [activeId, setActiveId] = useState(1);

  return (
    <List divided hover className="max-w-sm rounded border border-border">
      <List.Item active={activeId === 1} onClick={() => setActiveId(1)}>
        <List.Icon>
          <Profile color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2" className="font-medium">
            Active item
          </Typography>
          <Typography variant="body-3" className="text-dark/60">
            hover from List + active
          </Typography>
        </List.Content>
      </List.Item>
      <List.Item active={activeId === 2} onClick={() => setActiveId(2)}>
        <List.Icon>
          <Setting2 color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2">Clickable item</Typography>
          <Typography variant="body-3" className="text-dark/60">
            hover inherited from List
          </Typography>
        </List.Content>
      </List.Item>
      <List.Item hover={false} onClick={() => {}}>
        <List.Icon>
          <More color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2">No hover override</Typography>
          <Typography variant="body-3" className="text-dark/60">
            hover=&#123;false&#125;
          </Typography>
        </List.Content>
      </List.Item>
      <List.Item disabled onClick={() => {}}>
        <List.Icon>
          <More color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2">Disabled item</Typography>
          <Typography variant="body-3" className="text-dark/60">
            disabled
          </Typography>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon>
          <More color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2">Display only</Typography>
          <Typography variant="body-3" className="text-dark/60">
            no onClick
          </Typography>
        </List.Content>
      </List.Item>
    </List>
  );
}

export function WithAction() {
  return (
    <List divided hover className="max-w-sm rounded border border-border">
      <List.Item onClick={() => {}}>
        <List.Icon>
          <Profile color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2" className="font-medium">
            John Doe
          </Typography>
          <Typography variant="body-3" className="text-dark/60">
            +1 234 567 890
          </Typography>
        </List.Content>
        <List.Action>
          <Button type="button" size="icon" variant="text" color="primary">
            <CallCalling color="currentColor" variant="Bold" />
          </Button>
        </List.Action>
      </List.Item>
      <List.Item onClick={() => {}}>
        <List.Icon>
          <Profile color="currentColor" />
        </List.Icon>
        <List.Content>
          <Typography variant="body-2" className="font-medium">
            Jane Doe
          </Typography>
          <Typography variant="body-3" className="text-dark/60">
            +1 234 567 890
          </Typography>
        </List.Content>
        <List.Action>
          <Button type="button" size="icon" variant="text" color="danger">
            <Trash color="currentColor" variant="Bold" />
          </Button>
        </List.Action>
      </List.Item>
    </List>
  );
}

export default meta;
