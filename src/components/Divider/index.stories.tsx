import type { Meta } from "@storybook/react";
import {
  TextalignCenter,
  TextalignLeft,
  TextalignRight,
  TextBold,
} from "iconsax-react";
import Divider from ".";
import Card from "../Card";
import Stack from "../Stack";
import Typography from "../Typography";

const meta: Meta<typeof Divider> = {
  title: "Component/Divider",
  component: Divider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Horizontal() {
  return (
    <Card>
      <Card.Body>
        <Typography variant="body-2" className="py-2">
          Reaxify UI
        </Typography>
        <Divider />
        <Typography variant="body-2" className="py-2">
          Best UI Library For ReactJs
        </Typography>
        <Divider />
        <Typography variant="body-2" className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Typography>
      </Card.Body>
    </Card>
  );
}
export function VerticalWithStaticHeight() {
  return (
    <Card>
      <Card.Body className="p-0">
        <Stack className="w-fit h-10">
          <Stack className="size-10 items-center justify-center">
            <TextalignLeft color="currentColor" className="size-5" />
          </Stack>
          <Divider orientation="vertical" />
          <Stack className="size-10 items-center justify-center">
            <TextalignCenter color="currentColor" className="size-5" />
          </Stack>
          <Divider orientation="vertical" />
          <Stack className="size-10 items-center justify-center">
            <TextalignRight color="currentColor" className="size-5" />
          </Stack>
          <Divider orientation="vertical" />
          <Stack className="size-10 items-center justify-center">
            <TextBold color="currentColor" className="size-5" />
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
export function VerticalWithAutoHeightAndFlexItem() {
  return (
    <Card>
      <Card.Body className="p-0">
        <Stack className="w-fit">
          <Stack className="size-10 items-center justify-center">
            <TextalignLeft color="currentColor" className="size-5" />
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack className="size-10 items-center justify-center">
            <TextalignCenter color="currentColor" className="size-5" />
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack className="size-10 items-center justify-center">
            <TextalignRight color="currentColor" className="size-5" />
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack className="size-10 items-center justify-center">
            <TextBold color="currentColor" className="size-5" />
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
export function Variant() {
  return (
    <Card>
      <Card.Body>
        <Typography variant="body-2" className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Typography>
        <Divider variant="solid" className="border-dark" />
        <Typography variant="body-2" className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Typography>
        <Divider variant="dashed" className="border-dark" />
        <Typography variant="body-2" className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Typography>
        <Divider variant="dotted" className="border-dark" />
        <Typography variant="body-2" className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Typography>
      </Card.Body>
    </Card>
  );
}

export default meta;
