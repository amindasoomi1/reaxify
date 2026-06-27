import type { StoryObj } from "@storybook/react";

export const staticStoryParameters = {
  controls: { disable: true },
};

export function asStaticStory(render: StoryObj["render"]): StoryObj {
  return {
    parameters: staticStoryParameters,
    render,
  };
}
