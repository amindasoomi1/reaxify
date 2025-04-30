import { Button, Stack } from "@/components";
import type { Meta } from "@storybook/react";
import { ThemeProvider } from ".";

const meta: Meta = {
  title: "Providers",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Theme() {
  return (
    <Stack variant="vertical" className="items-start gap-4">
      <Button variant="solid" color="primary">
        Primary
      </Button>
      <Button variant="text" color="success">
        Success
      </Button>
      <ThemeProvider
        extendClasses={{
          button: {
            base: "rounded-full",
            color: {
              primary: { solid: "text-dark" },
              success: { text: "bg-success/10" },
            },
          },
        }}
      >
        <Button variant="solid" color="primary">
          Primary
        </Button>
        <Button variant="text" color="success">
          Success
        </Button>
      </ThemeProvider>
    </Stack>
  );
}
export default meta;
