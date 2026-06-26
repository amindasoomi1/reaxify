import { setAnchorPointer } from "@/helpers";
import { Color } from "@/types";
import type { Meta } from "@storybook/react";
import { Fragment, MouseEvent, useState } from "react";
import Tooltip from ".";
import Button from "../Button";
import Stack from "../Stack";
import Toggle from "../Toggle";

const meta: Meta<typeof Tooltip> = {
  title: "Component/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Hover() {
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
}

export function Click() {
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
}

export function ContextMenu() {
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
}

export function Colors() {
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
}

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

export function Placement() {
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
}

export default meta;
