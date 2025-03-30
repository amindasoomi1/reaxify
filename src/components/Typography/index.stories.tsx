import type { Meta } from "@storybook/react";
import { Typography } from ".";
import Stack from "../Stack";

const meta: Meta<typeof Typography> = {
  title: "Component/Typography",
  component: Typography,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Stack variant="vertical" className="gap-4">
      <Typography as="h1" variant="heading-1">
        Heading 1
      </Typography>
      <Typography as="h2" variant="heading-2">
        Heading 2
      </Typography>
      <Typography as="h3" variant="heading-3">
        Heading 3
      </Typography>
      <Typography as="h4" variant="heading-4">
        Heading 4
      </Typography>
      <Typography as="h5" variant="heading-5">
        Heading 5
      </Typography>
      <Typography as="h6" variant="heading-6">
        Heading 6
      </Typography>
      <Typography as="p" variant="body-1">
        Body 1
      </Typography>
      <Typography as="p" variant="body-2">
        Body 2
      </Typography>
    </Stack>
  );
}

export default meta;
