import type { Preview } from "@storybook/react";
import "../src/components/index.css";
import "../src/tailwindcss.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
