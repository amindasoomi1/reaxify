import {
  booleanArg,
  colorArgType,
  numberArg,
  tooltipPlacementArgType,
} from "@/storybook/argTypes";
import { setAnchorPointer } from "@/helpers";
import { staticStoryParameters } from "@/storybook/parameters";
import { Color } from "@/types";
import type { Meta, StoryObj } from "@storybook/react";
import { Fragment, MouseEvent, useState } from "react";
import Tooltip from ".";
import Button from "../Button";
import Stack from "../Stack";
import Toggle from "../Toggle";

const meta = {
  title: "Component/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    placement: "top",
    color: "dark",
    duration: 300,
    anchorPointer: false,
  },
  argTypes: {
    open: { table: { disable: true } },
    anchorEl: { table: { disable: true } },
    placement: tooltipPlacementArgType,
    color: colorArgType,
    duration: numberArg("Transition duration in milliseconds.", 300),
    anchorPointer: booleanArg(
      "Positions the tooltip at the pointer instead of the anchor.",
      false,
    ),
    onEnter: { table: { disable: true } },
    onEntering: { table: { disable: true } },
    onEntered: { table: { disable: true } },
    onExit: { table: { disable: true } },
    onExiting: { table: { disable: true } },
    onExited: { table: { disable: true } },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ placement, color, duration, anchorPointer }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = !!anchorEl;

    return (
      <>
        <Button
          type="button"
          onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
          onMouseLeave={() => setAnchorEl(null)}
        >
          Hover me
        </Button>
        <Tooltip
          anchorEl={anchorEl}
          open={open}
          placement={placement}
          color={color}
          duration={duration}
          anchorPointer={anchorPointer}
        >
          <Tooltip.Content>Tooltip</Tooltip.Content>
          <Tooltip.Arrow />
        </Tooltip>
      </>
    );
  },
};

export const Hover: Story = {
  parameters: staticStoryParameters,
  render: function Hover() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = !!anchorEl;

    return (
      <Fragment>
        <Button
          onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
          onMouseLeave={() => setAnchorEl(null)}
        >
          Hover me
        </Button>
        <Tooltip anchorEl={anchorEl} open={open} placement="top">
          <Tooltip.Content>Tooltip</Tooltip.Content>
          <Tooltip.Arrow />
        </Tooltip>
      </Fragment>
    );
  },
};

export const Click: Story = {
  parameters: staticStoryParameters,
  render: function Click() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = !!anchorEl;

    const handleClick = (e: MouseEvent<HTMLElement>) => {
      setAnchorEl((p) => (p ? null : e.currentTarget));
    };

    return (
      <Fragment>
        <Button onClick={handleClick}>Click me</Button>
        <Tooltip anchorEl={anchorEl} open={open} placement="top">
          <Tooltip.Content>Tooltip</Tooltip.Content>
          <Tooltip.Arrow />
        </Tooltip>
      </Fragment>
    );
  },
};

export const ContextMenu: Story = {
  parameters: staticStoryParameters,
  render: function ContextMenu() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = !!anchorEl;

    const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setAnchorPointer(e.currentTarget, e.clientX, e.clientY);
      setAnchorEl((p) => (p ? null : e.currentTarget));
    };

    return (
      <Fragment>
        <div
          onContextMenu={handleContextMenu}
          className="flex size-48 items-center justify-center rounded border border-dashed border-dark/20 bg-dark/5 text-sm text-dark/60 select-none"
        >
          Right click here
        </div>
        <Tooltip anchorEl={anchorEl} anchorPointer open={open} placement="top">
          <Tooltip.Content>Tooltip</Tooltip.Content>
          <Tooltip.Arrow />
        </Tooltip>
      </Fragment>
    );
  },
};

export const Colors: Story = {
  parameters: staticStoryParameters,
  render: () => {
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "dark",
      "light",
    ] as const;

    return (
      <Stack wrap className="items-center gap-4">
        {colors.map((color) => (
          <ColorTooltip key={color} color={color} />
        ))}
      </Stack>
    );
  },
};

function ColorTooltip({ color }: { color: Color }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  return (
    <Fragment>
      <Button
        onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
      >
        {color}
      </Button>
      <Tooltip anchorEl={anchorEl} open={open} color={color} placement="top">
        <Tooltip.Content>Tooltip</Tooltip.Content>
        <Tooltip.Arrow />
      </Tooltip>
    </Fragment>
  );
}

export const Placement: Story = {
  parameters: staticStoryParameters,
  render: () => {
    const placements = ["top", "end", "bottom", "start"] as const;
    return (
      <Stack wrap className="items-center gap-4 py-10">
        {placements.map((placement) => (
          <Toggle key={placement} anchor triggerOn="hover">
            <Toggle.Trigger>
              <Button>{placement}</Button>
            </Toggle.Trigger>
            <Toggle.Content>
              <Tooltip placement={placement}>
                <Tooltip.Content>{placement}</Tooltip.Content>
                <Tooltip.Arrow />
              </Tooltip>
            </Toggle.Content>
          </Toggle>
        ))}
      </Stack>
    );
  },
};
