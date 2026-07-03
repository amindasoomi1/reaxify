import {
  booleanArg,
  dividerOrientationArgType,
  dividerVariantArgType,
} from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
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

const meta = {
  title: "Component/Divider",
  component: Divider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    variant: "solid",
    flexItem: false,
  },
  argTypes: {
    orientation: dividerOrientationArgType,
    variant: dividerVariantArgType,
    flexItem: booleanArg(
      "Stretches the divider to fill the flex container height (vertical only).",
      false,
    ),
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ orientation, variant, flexItem }) => {
    if (orientation === "vertical" && flexItem) {
      return (
        <Card>
          <Card.Body className="p-0">
            <Stack className="w-fit">
              <Stack className="size-10 items-center justify-center">
                <TextalignLeft color="currentColor" className="size-5" />
              </Stack>
              <Divider orientation="vertical" variant={variant} flexItem />
              <Stack className="size-10 items-center justify-center">
                <TextalignCenter color="currentColor" className="size-5" />
              </Stack>
              <Divider orientation="vertical" variant={variant} flexItem />
              <Stack className="size-10 items-center justify-center">
                <TextalignRight color="currentColor" className="size-5" />
              </Stack>
              <Divider orientation="vertical" variant={variant} flexItem />
              <Stack className="size-10 items-center justify-center">
                <TextBold color="currentColor" className="size-5" />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      );
    }

    if (orientation === "vertical") {
      return (
        <Card>
          <Card.Body className="p-0">
            <Stack className="w-fit h-10">
              <Stack className="size-10 items-center justify-center">
                <TextalignLeft color="currentColor" className="size-5" />
              </Stack>
              <Divider orientation="vertical" variant={variant} />
              <Stack className="size-10 items-center justify-center">
                <TextalignCenter color="currentColor" className="size-5" />
              </Stack>
              <Divider orientation="vertical" variant={variant} />
              <Stack className="size-10 items-center justify-center">
                <TextalignRight color="currentColor" className="size-5" />
              </Stack>
              <Divider orientation="vertical" variant={variant} />
              <Stack className="size-10 items-center justify-center">
                <TextBold color="currentColor" className="size-5" />
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      );
    }

    if (variant !== "solid") {
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
  },
};

export const Horizontal = asStaticStory(() => (
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
  ));

export const VerticalWithStaticHeight = asStaticStory(() => (
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
  ));

export const VerticalWithAutoHeightAndFlexItem = asStaticStory(() => (
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
  ));

export const Variant = asStaticStory(() => (
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
  ));