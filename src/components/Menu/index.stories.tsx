import type { Meta } from "@storybook/react";
import { setAnchorPointer } from "@/helpers";
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
        <Menu.Item closeOnClick>Item #2 (Click On Close)</Menu.Item>
        <Menu.Item>Item #3</Menu.Item>
        <Menu.Item>Item #4</Menu.Item>
      </Menu>
    </Fragment>
  );
}
export function PreventClose() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Button onClick={handleClick}>Dropdown</Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        preventClose
        closeOnClick
      >
        <Menu.Item>Item #1</Menu.Item>
        <Menu.Item>Item #2</Menu.Item>
        <Menu.Item>Item #3</Menu.Item>
        <Menu.Item>Item #4</Menu.Item>
      </Menu>
    </Fragment>
  );
}
export function ContextMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;
  const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAnchorPointer(e.currentTarget, e.clientX, e.clientY);
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <div
        onContextMenu={handleContextMenu}
        className="flex size-48 items-center justify-center rounded border border-dashed border-dark/20 bg-dark/5 text-sm text-dark/60 select-none"
      >
        Right click here
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorPointer
        open={open}
        onClose={handleClose}
        closeOnClick
      >
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
      </Menu>
    </Fragment>
  );
}
export default meta;
