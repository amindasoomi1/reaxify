import {
  booleanArg,
  drawerAnchorArgType,
  numberArg,
} from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Drawer from ".";
import { useToggle } from "../../hooks";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import Typography from "../Typography";

const meta = {
  title: "Component/Drawer",
  component: Drawer,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    anchor: "end",
    duration: 300,
    preventClose: false,
  },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    anchor: drawerAnchorArgType,
    duration: numberArg("Transition duration in milliseconds.", 300),
    preventClose: booleanArg(
      "Prevents closing via backdrop click or escape.",
      false,
    ),
    onEnter: { table: { disable: true } },
    onEntering: { table: { disable: true } },
    onEntered: { table: { disable: true } },
    onExit: { table: { disable: true } },
    onExiting: { table: { disable: true } },
    onExited: { table: { disable: true } },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [open, toggleDrawer, closeDrawer] = useToggle(false);
    return (
      <div>
        <Button type="button" onClick={toggleDrawer}>
          Show drawer
        </Button>
        <Drawer {...args} open={open} onClose={closeDrawer}>
          <Drawer.Menu>
            <Drawer.Header>
              <Typography variant="heading-6">Drawer header</Typography>
            </Drawer.Header>
            <Drawer.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur atque debitis fugiat voluptatum facere, voluptate
                sapiente accusantium, dolor dicta mollitia corporis quas possimus
                omnis minus sequi, recusandae earum deserunt? Doloremque.
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
      </div>
    );
  },
};

export const Default = asStaticStory(function Default() {
    const [openDrawer, toggleDrawer, closeDrawer] = useToggle(false);
    return (
      <div>
        <Button type="button" onClick={toggleDrawer}>
          Show drawer
        </Button>
        <Drawer open={openDrawer} onClose={closeDrawer}>
          <Drawer.Menu>
            <Drawer.Header>
              <Typography variant="heading-6">Drawer header</Typography>
            </Drawer.Header>
            <Drawer.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur atque debitis fugiat voluptatum facere, voluptate
                sapiente accusantium, dolor dicta mollitia corporis quas possimus
                omnis minus sequi, recusandae earum deserunt? Doloremque.
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
      </div>
    );
  });

export const Anchor = asStaticStory(function Anchor() {
    const anchors = ["top", "start", "bottom", "end"] as const;
    const [state, setState] = useState({
      top: false,
      start: false,
      bottom: false,
      end: false,
    });
    const toggleDrawer = (anchor: keyof typeof state, open: boolean) => {
      setState((prev) => {
        return { ...prev, [anchor]: open };
      });
    };
    return (
      <ButtonGroup>
        {anchors.map((anchor) => (
          <Button
            key={anchor}
            type="button"
            onClick={() => toggleDrawer(anchor, true)}
            className="capitalize"
          >
            {anchor}
          </Button>
        ))}
        {anchors.map((anchor) => (
          <Drawer
            key={anchor}
            anchor={anchor}
            open={state[anchor]}
            onClose={() => toggleDrawer(anchor, false)}
          >
            <Drawer.Menu>
              <Drawer.Header>
                <Typography variant="heading-6">Drawer header</Typography>
              </Drawer.Header>
              <Drawer.Body>
                <Typography variant="body-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur atque debitis fugiat voluptatum facere, voluptate
                  sapiente accusantium, dolor dicta mollitia corporis quas
                  possimus omnis minus sequi, recusandae earum deserunt?
                  Doloremque.
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
        ))}
      </ButtonGroup>
    );
  });

export const PreventClose = asStaticStory(function PreventClose() {
    const [openDrawer, toggleDrawer, closeDrawer] = useToggle(false);
    return (
      <div>
        <Button type="button" onClick={toggleDrawer}>
          Show drawer
        </Button>
        <Drawer open={openDrawer} onClose={closeDrawer} preventClose>
          <Drawer.Menu>
            <Drawer.Header>
              <Typography variant="heading-6">Drawer header</Typography>
            </Drawer.Header>
            <Drawer.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur atque debitis fugiat voluptatum facere, voluptate
                sapiente accusantium, dolor dicta mollitia corporis quas possimus
                omnis minus sequi, recusandae earum deserunt? Doloremque.
              </Typography>
            </Drawer.Body>
            <Drawer.Footer className="flex items-center *:flex-1 gap-4">
              <Button type="button" variant="outline" color="danger" closeDrawer>
                Cancel (prevented)
              </Button>
              <Button
                type="button"
                variant="solid"
                color="success"
                onClick={closeDrawer}
              >
                Accept and close
              </Button>
            </Drawer.Footer>
          </Drawer.Menu>
        </Drawer>
      </div>
    );
  });