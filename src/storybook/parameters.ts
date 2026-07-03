import type { ReactElement } from "react";

export const staticStoryParameters = {
  controls: { disable: true },
};

type StoryRender = (...args: never[]) => ReactElement;

export function asStaticStory(render: StoryRender): StoryRender {
  return Object.assign(render, { parameters: staticStoryParameters });
}
