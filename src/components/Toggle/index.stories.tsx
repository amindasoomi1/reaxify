import {
  booleanArg,
  toggleTriggerOnArgType,
} from "@/storybook/argTypes";
import { staticStoryParameters } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import Toggle from ".";
import Button from "../Button";
import Drawer from "../Drawer";
import Menu from "../Menu";
import Modal from "../Modal";
import Tooltip from "../Tooltip";
import Typography from "../Typography";

const meta = {
  title: "Component/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    anchor: true,
    triggerOn: "click",
    defaultOpen: false,
  },
  argTypes: {
    anchor: booleanArg(
      "Positions content relative to the trigger element.",
      true,
    ),
    triggerOn: toggleTriggerOnArgType,
    defaultOpen: booleanArg("Initial open state for uncontrolled usage.", false),
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ anchor, triggerOn, defaultOpen }) => (
    <Toggle anchor={anchor} triggerOn={triggerOn} defaultOpen={defaultOpen}>
      <Toggle.Trigger>
        <Button type="button">Dropdown</Button>
      </Toggle.Trigger>
      <Toggle.Content>
        <Menu closeOnClick>
          <Menu.Item>Item #1</Menu.Item>
          <Menu.Item>Item #2</Menu.Item>
          <Menu.Item>Item #3</Menu.Item>
        </Menu>
      </Toggle.Content>
    </Toggle>
  ),
};

export const WithDrawer: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Toggle>
      <Toggle.Trigger>
        <Button type="button">Show drawer</Button>
      </Toggle.Trigger>
      <Toggle.Content>
        <Drawer>
          <Drawer.Menu>
            <Drawer.Header>
              <Typography variant="heading-6">Drawer header</Typography>
            </Drawer.Header>
            <Drawer.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Drawer.Body>
            <Drawer.Footer className="flex items-center *:flex-1 gap-4">
              <Button
                type="button"
                variant="outline"
                color="danger"
                closeDrawer
              >
                Cancel
              </Button>
              <Button type="button" variant="solid" color="success">
                Accept
              </Button>
            </Drawer.Footer>
          </Drawer.Menu>
        </Drawer>
      </Toggle.Content>
    </Toggle>
  ),
};

export const WithModal: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Toggle>
      <Toggle.Trigger>
        <Button type="button">Show modal</Button>
      </Toggle.Trigger>
      <Toggle.Content>
        <Modal>
          <Modal.Dialog>
            <Modal.Header>
              <Typography variant="heading-6">Modal header</Typography>
            </Modal.Header>
            <Modal.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Modal.Body>
            <Modal.Footer className="flex items-center justify-end gap-4">
              <Button type="button" variant="outline" color="danger" closeModal>
                Cancel
              </Button>
              <Button type="button" variant="solid" color="success">
                Accept
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </Toggle.Content>
    </Toggle>
  ),
};

export const WithMenu: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Toggle anchor>
      <Toggle.Trigger>
        <Button type="button">Dropdown</Button>
      </Toggle.Trigger>
      <Toggle.Content>
        <Menu>
          <Menu.Item>Item #1</Menu.Item>
          <Menu.Item>Item #2</Menu.Item>
          <Menu.Item>Item #3</Menu.Item>
        </Menu>
      </Toggle.Content>
    </Toggle>
  ),
};

export const WithContextMenu: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Toggle anchor triggerOn="contextMenu">
      <Toggle.Trigger>
        <div className="flex size-48 items-center justify-center rounded border border-dashed border-dark/20 bg-dark/5 text-sm text-dark/60 select-none">
          Right click here
        </div>
      </Toggle.Trigger>
      <Toggle.Content>
        <Menu closeOnClick>
          <Menu.Item>Copy</Menu.Item>
          <Menu.Item>Paste</Menu.Item>
          <Menu.Item>Delete</Menu.Item>
        </Menu>
      </Toggle.Content>
    </Toggle>
  ),
};

export const WithTooltip: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Toggle anchor triggerOn="hover">
      <Toggle.Trigger>
        <Button type="button">Hover me</Button>
      </Toggle.Trigger>
      <Toggle.Content>
        <Tooltip placement="top">
          <Tooltip.Content>Tooltip</Tooltip.Content>
          <Tooltip.Arrow />
        </Tooltip>
      </Toggle.Content>
    </Toggle>
  ),
};
