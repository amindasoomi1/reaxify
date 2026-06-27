import type { InputType } from "@storybook/core/csf";

export const COLORS = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "dark",
  "light",
] as const;

export const SIZES = ["sm", "md", "lg"] as const;

export const BUTTON_SIZES = ["sm", "md", "lg", "icon"] as const;

export const BADGE_VARIANTS = ["solid", "outline", "soft"] as const;

export const BUTTON_VARIANTS = ["solid", "outline", "text", "soft"] as const;

export const ALERT_VARIANTS = ["solid", "outline", "soft"] as const;

export const TYPOGRAPHY_VARIANTS = [
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "heading-5",
  "heading-6",
  "body-1",
  "body-2",
  "body-3",
] as const;

export const DIVIDER_ORIENTATIONS = ["horizontal", "vertical"] as const;

export const DIVIDER_VARIANTS = ["solid", "dashed", "dotted"] as const;

export const STACK_DIRECTIONS = ["row", "column"] as const;

export const DRAWER_ANCHORS = ["start", "end", "top", "bottom"] as const;

export const TOOLTIP_PLACEMENTS = ["top", "end", "bottom", "start"] as const;

export const TOGGLE_TRIGGER_ON = ["hover", "click", "contextMenu"] as const;

export const BUTTON_GROUP_ORIENTATIONS = ["horizontal", "vertical"] as const;

export const ACCORDION_VARIANTS = ["single", "multiple"] as const;

type ArgControl = NonNullable<InputType["control"]>;

function defaultSummary(
  value: string | number | boolean,
): NonNullable<InputType["table"]> {
  return { defaultValue: { summary: String(value) } };
}

export function argType(
  description: string,
  defaultValue: string | number | boolean,
  control: ArgControl,
  options?: readonly string[],
): InputType {
  return {
    description,
    table: defaultSummary(defaultValue),
    ...(options ? { options: [...options] } : {}),
    control,
  };
}

export const hidden: InputType = {
  table: { disable: true },
};

export const actionHidden: InputType = {
  control: false,
  table: { disable: true },
};

export const colorArgType = argType(
  "Semantic color of the component.",
  "primary",
  { type: "select" },
  COLORS,
);

export const sizeArgType = argType(
  "Size of the component.",
  "md",
  { type: "select" },
  SIZES,
);

export const buttonSizeArgType = argType(
  "Size of the button.",
  "md",
  { type: "select" },
  BUTTON_SIZES,
);

export const badgeVariantArgType = argType(
  "Visual style of the badge.",
  "solid",
  { type: "select" },
  BADGE_VARIANTS,
);

export const buttonVariantArgType = argType(
  "Visual style of the button.",
  "solid",
  { type: "select" },
  BUTTON_VARIANTS,
);

export const alertVariantArgType = argType(
  "Visual style of the alert.",
  "solid",
  { type: "select" },
  ALERT_VARIANTS,
);

export const typographyVariantArgType = argType(
  "Typography style preset.",
  "body-1",
  { type: "select" },
  TYPOGRAPHY_VARIANTS,
);

export const dividerOrientationArgType = argType(
  "Orientation of the divider line.",
  "horizontal",
  { type: "select" },
  DIVIDER_ORIENTATIONS,
);

export const dividerVariantArgType = argType(
  "Border style of the divider.",
  "solid",
  { type: "select" },
  DIVIDER_VARIANTS,
);

export const stackDirectionArgType = argType(
  "Flex direction of the stack.",
  "row",
  { type: "select" },
  STACK_DIRECTIONS,
);

export const drawerAnchorArgType = argType(
  "Edge of the screen where the drawer opens.",
  "end",
  { type: "select" },
  DRAWER_ANCHORS,
);

export const tooltipPlacementArgType = argType(
  "Placement of the tooltip relative to the anchor.",
  "top",
  { type: "select" },
  TOOLTIP_PLACEMENTS,
);

export const toggleTriggerOnArgType = argType(
  "Event that opens the toggle content.",
  "click",
  { type: "select" },
  TOGGLE_TRIGGER_ON,
);

export const buttonGroupOrientationArgType = argType(
  "Layout direction of the button group.",
  "horizontal",
  { type: "select" },
  BUTTON_GROUP_ORIENTATIONS,
);

export const accordionVariantArgType = argType(
  "Whether one or multiple items can be open at once.",
  "single",
  { type: "select" },
  ACCORDION_VARIANTS,
);

export function booleanArg(
  description: string,
  defaultValue: boolean,
): InputType {
  return argType(description, defaultValue, { type: "boolean" });
}

export function textArg(
  description: string,
  defaultValue: string,
): InputType {
  return argType(description, defaultValue, { type: "text" });
}

export function numberArg(
  description: string,
  defaultValue: number,
): InputType {
  return {
    description,
    table: defaultSummary(defaultValue),
    control: { type: "number" },
  };
}

export function rangeArg(
  description: string,
  defaultValue: number,
  min: number,
  max: number,
  step = 1,
): InputType {
  return {
    description,
    table: defaultSummary(defaultValue),
    control: { type: "range", min, max, step },
  };
}

export const polymorphicHidden = {
  as: hidden,
  className: hidden,
  ref: hidden,
  children: hidden,
};

export type { InputType };
