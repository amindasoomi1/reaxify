import {
  booleanArg,
  numberArg,
  sizeArgType,
} from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from ".";
import { useToggle } from "../../hooks";
import Button from "../Button";
import Typography from "../Typography";

const meta = {
  title: "Component/Modal",
  component: Modal,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    size: "md",
    duration: 300,
    preventClose: false,
  },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    size: sizeArgType,
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
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [open, toggleModal, closeModal] = useToggle(false);
    return (
      <div>
        <Button type="button" onClick={toggleModal}>
          Show modal
        </Button>
        <Modal {...args} open={open} onClose={closeModal}>
          <Modal.Dialog>
            <Modal.Header>
              <Typography variant="heading-6">Modal header</Typography>
            </Modal.Header>
            <Modal.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur atque debitis fugiat voluptatum facere, voluptate
                sapiente accusantium, dolor dicta mollitia corporis quas possimus
                omnis minus sequi, recusandae earum deserunt? Doloremque.
              </Typography>
            </Modal.Body>
            <Modal.Footer className="flex items-center *:flex-1 gap-4">
              <Button type="button" variant="outline" color="danger" closeModal>
                Cancel
              </Button>
              <Button type="button" variant="solid" color="success">
                Accept
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  },
};

export const Default = asStaticStory(function Default() {
    const [openModal, toggleModal, closeModal] = useToggle(false);
    return (
      <div>
        <Button type="button" onClick={toggleModal}>
          Show modal
        </Button>
        <Modal open={openModal} onClose={closeModal}>
          <Modal.Dialog>
            <Modal.Header>
              <Typography variant="heading-6">Modal header</Typography>
            </Modal.Header>
            <Modal.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur atque debitis fugiat voluptatum facere, voluptate
                sapiente accusantium, dolor dicta mollitia corporis quas possimus
                omnis minus sequi, recusandae earum deserunt? Doloremque.
              </Typography>
            </Modal.Body>
            <Modal.Footer className="flex items-center *:flex-1 gap-4">
              <Button type="button" variant="outline" color="danger" closeModal>
                Cancel
              </Button>
              <Button type="button" variant="solid" color="success">
                Accept
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  });

export const PreventClose = asStaticStory(function PreventClose() {
    const [openModal, toggleModal, closeModal] = useToggle(false);
    return (
      <div>
        <Button type="button" onClick={toggleModal}>
          Show modal
        </Button>
        <Modal open={openModal} onClose={closeModal} preventClose>
          <Modal.Dialog>
            <Modal.Header>
              <Typography variant="heading-6">Modal header</Typography>
            </Modal.Header>
            <Modal.Body>
              <Typography variant="body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur atque debitis fugiat voluptatum facere, voluptate
                sapiente accusantium, dolor dicta mollitia corporis quas possimus
                omnis minus sequi, recusandae earum deserunt? Doloremque.
              </Typography>
            </Modal.Body>
            <Modal.Footer className="flex items-center *:flex-1 gap-4">
              <Button type="button" variant="outline" color="danger" closeModal>
                Cancel (prevented)
              </Button>
              <Button
                type="button"
                variant="solid"
                color="success"
                onClick={closeModal}
              >
                Accept and close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  });