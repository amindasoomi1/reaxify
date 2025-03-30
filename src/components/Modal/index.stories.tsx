import type { Meta } from "@storybook/react";
import Modal from ".";
import { useToggle } from "../..//hooks";
import Box from "../Box";
import Button from "../Button";
import Typography from "../Typography";

const meta: Meta<typeof Modal> = {
  title: "Component/Modal",
  component: Modal,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;

export function Default() {
  const [openModal, toggleModal, closeModal] = useToggle(false);
  return (
    <Box>
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
    </Box>
  );
}
export default meta;
