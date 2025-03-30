import type { Meta } from "@storybook/react";
import { MouseEvent, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Menu, MenuItem } from ".";
import Button from "../Button";

const meta: Meta<typeof Menu> = {
  title: "Component/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Dropdown() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCLose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Button onClick={handleClick}>Dropdown</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCLose}>
        <MenuItem>Item #1</MenuItem>
        <MenuItem>Item #2</MenuItem>
        <MenuItem>Item #3</MenuItem>
        <MenuItem>Item #4</MenuItem>
      </Menu>
    </Fragment>
  );
}
export function CloseOnClick() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCLose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Button onClick={handleClick}>Close on click all item</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCLose} closeOnClick>
        <MenuItem>Item #1</MenuItem>
        <MenuItem>Item #2</MenuItem>
        <MenuItem>Item #3</MenuItem>
        <MenuItem>Item #4</MenuItem>
      </Menu>
    </Fragment>
  );
}
export function CloseOnClickOneItem() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCLose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Button onClick={handleClick}>Close on click one item</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCLose}>
        <MenuItem>Item #1</MenuItem>
        <MenuItem closeOnClick>Item #2 (ClickOnClose)</MenuItem>
        <MenuItem>Item #3</MenuItem>
        <MenuItem>Item #4</MenuItem>
      </Menu>
    </Fragment>
  );
}
export default meta;
