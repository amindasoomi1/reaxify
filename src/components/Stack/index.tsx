import { asComponent, cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Directions = "row" | "column";
type StackProps = {
  direction?: Directions;
  wrap?: boolean | "reverse";
  reverse?: boolean;
};
type DirectionsObject = { [key in Directions]: string | undefined };

export default function Stack<E extends ElementType = "div">({
  as,
  direction = "row",
  wrap = false,
  reverse = false,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, StackProps>) {
  const classes = useClasses((c) => c.stack);
  const directionClasses = useMemo(() => {
    const directions: DirectionsObject = {
      row: cn(
        "[&>*:not([class*='min-w-'])]:min-w-0",
        reverse ? "flex-row-reverse" : "flex-row",
        classes?.directions?.row,
      ),
      column: cn(
        "[&>*:not([class*='min-h-'])]:min-h-0",
        reverse ? "flex-col-reverse" : "flex-col",
        classes?.directions?.column,
      ),
    };
    return directions[direction];
  }, [direction, reverse, classes?.directions]);
  const wrapClasses = useMemo(() => {
    if (wrap === "reverse") return "flex-wrap-reverse";
    if (wrap) return "flex-wrap";
    return null;
  }, [wrap]);
  const Component = asComponent(as, "div");
  return (
    <Component
      data-name="stack"
      className={twMerge(
        "flex",
        classes?.base,
        directionClasses,
        wrapClasses,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
