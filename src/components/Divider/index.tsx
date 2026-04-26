import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Orientation = "horizontal" | "vertical";
type Variant = "solid" | "dashed" | "dotted";

type Props = {
  orientation?: Orientation;
  variant?: Variant;
  flexItem?: boolean;
  children?: never;
  //   thickness?: number;
};

type Orientations = Record<Orientation, string>;
type Variants = Record<Variant, string>;

export default function Divider<E extends ElementType = "hr">({
  as,
  orientation = "horizontal",
  variant = "solid",
  flexItem = false,
  //   thickness = 1,
  className,
  ...props
}: ComponentPropsWithAs<E, Props>) {
  const classes = useClasses((s) => s.divider);
  const Component = as ?? "hr";
  const orientationClasses = useMemo(() => {
    const orientations: Orientations = {
      horizontal: `${flexItem ? "w-auto self-stretch" : "w-full"} h-0 border-b`,
      vertical: `${flexItem ? "h-auto self-stretch" : "h-full"} w-0 border-s`,
    };
    return [orientations?.[orientation], classes?.orientation?.[orientation]];
  }, [orientation, classes?.orientation, flexItem]);
  const variantClasses = useMemo(() => {
    const variants: Variants = {
      solid: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted",
    };
    return [variants?.[variant], classes?.variant?.[variant]];
  }, [variant, classes?.variant]);
  return (
    <Component
      className={twMerge(
        "border-border border-0",
        classes?.base,
        orientationClasses,
        variantClasses,
        className,
      )}
      {...props}
    />
  );
}
