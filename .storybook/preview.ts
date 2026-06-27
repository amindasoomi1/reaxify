import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/style.css";

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      sort: "requiredFirst",
      exclude: ["as", "className", "ref", "children"],
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
