import { stackDirectionArgType } from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import Stack from ".";

const meta = {
  title: "Component/Stack",
  component: Stack,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    direction: "row",
    wrap: false,
    reverse: false,
  },
  argTypes: {
    direction: stackDirectionArgType,
    wrap: {
      description: "Wrap items to the next line, or reverse-wrap order.",
      table: { defaultValue: { summary: "false" } },
      options: [true, false, "reverse"],
      control: { type: "select" },
    },
    reverse: {
      description: "Reverses the flex direction.",
      table: { defaultValue: { summary: "false" } },
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Stack {...args} className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  ),
};

export const Default = asStaticStory(() => (
    <Stack className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  ));

export const Horizontal = asStaticStory(() => (
    <Stack direction="row" className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  ));

export const Vertical = asStaticStory(() => (
    <Stack direction="column" className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  ));

export const Wrap = asStaticStory(() => (
    <Stack wrap className="gap-4">
      {[...Array(12).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  ));

export const Reverse = asStaticStory(() => (
    <Stack reverse className="gap-4">
      {[...Array(3).keys()].map((key) => (
        <div key={key} className="p-6 border border-black">
          Div #{key + 1}
        </div>
      ))}
    </Stack>
  ));