import { cn } from "@/helpers";
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
  color = null,
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
        soft: "bg-primary/10 text-primary border-primary/10",
      },
      secondary: {
        solid: "bg-secondary text-white border-secondary",
        outline: "bg-transparent text-secondary border-secondary",
        soft: "bg-secondary/10 text-secondary border-secondary/10",
      },
      success: {
        solid: "bg-success text-white border-success",
        outline: "bg-transparent text-success border-success",
        soft: "bg-success/10 text-success border-success/10",
      },
      info: {
        solid: "bg-info text-white border-info",
        outline: "bg-transparent text-info border-info",
        soft: "bg-info/10 text-info border-info/10",
      },
      warning: {
        solid: "bg-warning text-white border-warning",
        outline: "bg-transparent text-warning border-warning",
        soft: "bg-warning/10 text-warning border-warning/10",
      },
      danger: {
        solid: "bg-danger text-white border-danger",
        outline: "bg-transparent text-danger border-danger",
        soft: "bg-danger/10 text-danger border-danger/10",
      },
      dark: {
        solid: "bg-dark text-white border-dark",
        outline: "bg-transparent text-dark border-dark",
        soft: "bg-dark/10 text-dark border-dark/10",
      },
      light: {
        solid: "bg-light text-dark border-light",
        outline: "bg-transparent text-dark border-light",
        soft: "bg-light/10 text-dark border-light/10",
      },
    };
    const colorResult = colors?.[color]?.[variant];
    const classesResult = classes?.color?.[color]?.[variant];
    return [colorResult, classesResult];
  }, [color, variant, classes?.color]);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: cn("text-xs py-0.5 px-1.5", classes?.size?.sm),
      md: cn("text-sm py-[0.1875rem] px-2", classes?.size?.md),
      lg: cn("text-base py-1 px-3", classes?.size?.lg),
    };
    return sizes?.[size];
  }, [size, classes?.size]);
  return (
    <Component
      className={twMerge(
        "inline-flex border border-[#e8eaee] items-center text-center font-medium align-middle whitespace-nowrap rounded",
        classes?.base,
        colorClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
