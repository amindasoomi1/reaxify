import type { Meta } from "@storybook/react";
import Button from "../Button";
import Drawer from "../Drawer";
import Menu from "../Menu";
import Modal from "../Modal";
import Typography from "../Typography";
import Toggle from ".";

const meta: Meta<typeof Toggle> = {
  title: "Component/Toggle",
  component: Toggle,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function WithDrawer() {
  return (
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
              <Button type="button" variant="outline" color="danger" closeDrawer>
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
  );
}

export function WithModal() {
  return (
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
  );
}

export function WithMenu() {
  return (
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
  );
}

export function WithContextMenu() {
  return (
    <Toggle anchor pointer>
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
  );
}

export default meta;
