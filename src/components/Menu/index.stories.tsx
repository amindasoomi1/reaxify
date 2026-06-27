import {
  booleanArg,
  numberArg,
} from "@/storybook/argTypes";
import { setAnchorPointer } from "@/helpers";
import { staticStoryParameters } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react/jsx-runtime";
import { MouseEvent, useState } from "react";
import Menu from ".";
import Button from "../Button";

const meta = {
  title: "Component/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    closeOnClick: false,
    preventClose: false,
    anchorPointer: false,
    duration: 300,
  },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    anchorEl: { table: { disable: true } },
    closeOnClick: booleanArg("Closes the menu when an item is clicked.", false),
    preventClose: booleanArg(
      "Prevents closing via backdrop click or escape.",
      false,
    ),
    anchorPointer: booleanArg(
      "Positions the menu at the pointer instead of the anchor element.",
      false,
    ),
    duration: numberArg("Transition duration in milliseconds.", 300),
    onEnter: { table: { disable: true } },
    onEntering: { table: { disable: true } },
    onEntered: { table: { disable: true } },
    onExit: { table: { disable: true } },
    onExiting: { table: { disable: true } },
    onExited: { table: { disable: true } },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = !!anchorEl;
    const handleClick = (e: MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Button type="button" onClick={handleClick}>
          Dropdown
        </Button>
        <Menu {...args} anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Menu.Item>Item #1</Menu.Item>
          <Menu.Item>Item #2</Menu.Item>
          <Menu.Item>Item #3</Menu.Item>
          <Menu.Item>Item #4</Menu.Item>
        </Menu>
      </>
    );
  },
};

export const Dropdown: Story = {
  parameters: staticStoryParameters,
  render: function Dropdown() {
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
  },
};

export const CloseOnClick: Story = {
  parameters: staticStoryParameters,
  render: function CloseOnClick() {
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
  },
};

export const CloseOnClickOneItem: Story = {
  parameters: staticStoryParameters,
  render: function CloseOnClickOneItem() {
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
  },
};

export const PreventClose: Story = {
  parameters: staticStoryParameters,
  render: function PreventClose() {
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
  },
};
