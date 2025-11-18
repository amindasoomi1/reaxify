import type { Meta, StoryFn } from "@storybook/react";
import { Fragment } from "react";
import Stack from ".";

const meta: Meta<typeof Stack> = {
  title: "Component/Stack",
  component: Stack,
  parameters: { layout: "padded" },
  args: {
    as: undefined as never,
    children: undefined as never,
    variant: "horizontal",
    wrap: false,
    reverse: false,
  },
  argTypes: {
    as: { control: false },
    children: { control: false },
    variant: {
      options: ["vertical", "horizontal"],
      control: { type: "select" },
    },
    wrap: {
      options: [true, false, "reverse"],
      control: { type: "select" },
    },
    reverse: {
      options: [true, false],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
};
const Template: StoryFn<typeof Stack> = (args) => (
  <Stack {...args} className="gap-4" />
);

export const Default = Template.bind({});
Default.storyName = "Stack";
Default.args = {
  children: (
    <Fragment>
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Fragment>
  ),
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  variant: "horizontal",
  children: (
    <Fragment>
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Fragment>
  ),
};

export const Vertical = Template.bind({});
Vertical.args = {
  variant: "vertical",
  children: (
    <Fragment>
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Fragment>
  ),
};

export const Wrap = Template.bind({});
Wrap.args = {
  wrap: true,
  children: (
    <Fragment>
      {[...Array(12).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Fragment>
  ),
};

export const Reverse = Template.bind({});
Reverse.args = {
  reverse: true,
  children: (
    <Fragment>
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Fragment>
  ),
};

export default meta;
