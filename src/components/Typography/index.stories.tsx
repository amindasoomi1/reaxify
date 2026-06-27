import type { Meta } from "@storybook/react";
import Typography from ".";
import Stack from "../Stack";

const meta: Meta<typeof Typography> = {
  title: "Component/Typography",
  component: Typography,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Stack direction="column" className="gap-4">
      <Typography variant="heading-1">Heading 1</Typography>
      <Typography variant="heading-2">Heading 2</Typography>
      <Typography variant="heading-3">Heading 3</Typography>
      <Typography variant="heading-4">Heading 4</Typography>
      <Typography variant="heading-5">Heading 5</Typography>
      <Typography variant="heading-6">Heading 6</Typography>
      <Typography variant="body-1">Body 1</Typography>
      <Typography variant="body-2">Body 2</Typography>
      <Typography variant="body-3">Body 3</Typography>
    </Stack>
  );
}

export default meta;
