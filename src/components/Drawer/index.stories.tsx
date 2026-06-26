import type { Meta } from "@storybook/react";
import { Fragment, useState } from "react";
import Drawer from ".";
import { useToggle } from "../..//hooks";
import Button from "../Button";
import Stack from "../Stack";
import Typography from "../Typography";

const meta: Meta<typeof Drawer> = {
  title: "Component/Drawer",
  component: Drawer,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function Default() {
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
}

export function Anchor() {
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
    <Stack wrap className="gap-2">
      {(["top", "start", "bottom", "end"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <Button
            type="button"
            onClick={() => toggleDrawer(anchor, true)}
            className="capitalize"
          >
            {anchor}
          </Button>
          <Drawer
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
        </Fragment>
      ))}
    </Stack>
  );
}
export function PreventClose() {
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
            <Button
              type="button"
              variant="outline"
              color="danger"
              onClick={closeDrawer}
            >
              Cancel
            </Button>
            <Button type="button" variant="solid" color="success">
              Understood
            </Button>
          </Drawer.Footer>
        </Drawer.Menu>
      </Drawer>
    </div>
  );
}
export default meta;
