import type { Meta } from "@storybook/react";
import { MouseEvent, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Menu from ".";
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
        <Menu.Item>Item #1</Menu.Item>
        <Menu.Item>Item #2</Menu.Item>
        <Menu.Item>Item #3</Menu.Item>
        <Menu.Item>Item #4</Menu.Item>
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
        <Menu.Item>Item #1</Menu.Item>
        <Menu.Item>Item #2</Menu.Item>
        <Menu.Item>Item #3</Menu.Item>
        <Menu.Item>Item #4</Menu.Item>
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
        <Menu.Item>Item #1</Menu.Item>
        <Menu.Item closeOnClick>Item #2 (ClickOnClose)</Menu.Item>
        <Menu.Item>Item #3</Menu.Item>
        <Menu.Item>Item #4</Menu.Item>
      </Menu>
    </Fragment>
  );
}
export default meta;
