import { useClasses } from "@/hooks";
import { BadgeVariant, Color, ComponentPropsWithAs, Size } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type BadgeProps = {
  variant?: BadgeVariant;
  color?: Color | null;
  size?: Size;
};
type Colors = {
  [key in Color]?: {
    [key in BadgeVariant]?: string;
  };
};
type Sizes = {
  [key in Size]?: string;
};

export default function Badge<E extends ElementType = "span">({
  as,
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, BadgeProps>) {
  const classes = useClasses((c) => c.badge);
  const Component = as || "span";
  const colorClasses = useMemo(() => {
    if (!color) return "border-transparent";
    const colors: Colors = {
      primary: {
        solid: "bg-primary text-white border-primary",
        outline: "bg-transparent text-primary border-primary",
        soft: "bg-light-primary text-dark-primary border-light-primary",
      },
      secondary: {
        solid: "bg-secondary text-white border-secondary",
        outline: "bg-transparent text-secondary border-secondary",
        soft: "bg-light-secondary text-dark-secondary border-light-secondary",
      },
      success: {
        solid: "bg-success text-white border-success",
        outline: "bg-transparent text-success border-success",
        soft: "bg-light-success text-dark-success border-light-success",
      },
      info: {
        solid: "bg-info text-white border-info",
        outline: "bg-transparent text-info border-info",
        soft: "bg-light-info text-dark-info border-light-info",
      },
      warning: {
        solid: "bg-warning text-white border-warning",
        outline: "bg-transparent text-warning border-warning",
        soft: "bg-light-warning text-dark-warning border-light-warning",
      },
      danger: {
        solid: "bg-danger text-white border-danger",
        outline: "bg-transparent text-danger border-danger",
        soft: "bg-light-danger text-dark-danger border-light-danger",
      },
      dark: {
        solid: "bg-dark text-white border-dark",
        outline: "bg-transparent text-dark border-dark",
        soft: "bg-dark text-white border-dark",
      },
      light: {
        solid: "bg-light text-dark border-light",
        outline: "bg-transparent text-dark border-light",
        soft: "bg-light text-dark border-light",
      },
    };
    const colorResult = colors?.[color]?.[variant];
    const classesResult = classes?.color?.[color]?.[variant];
    return [colorResult, classesResult];
  }, [color, variant, classes?.color]);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "text-xs py-0.5 px-1.5",
      md: "text-sm py-[0.1875rem] px-2",
      lg: "text-base py-1 px-3",
    };
    const sizeResult = sizes?.[size];
    const classesResult = classes?.size?.[size];
    return [sizeResult, classesResult];
  }, [size, classes?.size]);
  return (
    <Component
      className={twMerge(
        "inline-flex border border-border items-center text-center font-medium align-middle whitespace-nowrap rounded",
        classes?.base,
        colorClasses,
        sizeClasses,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
