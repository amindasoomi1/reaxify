import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { Color, ComponentPropsWithAs } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "solid" | "outline" | "soft";
type Size = "sm" | "md" | "lg";

type BadgeProps = {
  variant?: Variant;
  color?: Color | null;
  size?: Size;
};
type Colors = {
  [key in Color]?: {
    [key in Variant]?: string;
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
        solid: cn(
          "bg-primary text-white border-primary",
          classes?.color?.primary?.solid
        ),
        outline: cn(
          "bg-transparent text-primary border-primary",
          classes?.color?.primary?.outline
        ),
        soft: cn(
          "bg-primary/10 text-primary border-primary/10",
          classes?.color?.primary?.soft
        ),
      },
      secondary: {
        solid: cn(
          "bg-secondary text-white border-secondary",
          classes?.color?.secondary?.solid
        ),
        outline: cn(
          "bg-transparent text-secondary border-secondary",
          classes?.color?.secondary?.outline
        ),
        soft: cn(
          "bg-secondary/10 text-secondary border-secondary/10",
          classes?.color?.secondary?.soft
        ),
      },
      success: {
        solid: cn(
          "bg-success text-white border-success",
          classes?.color?.success?.solid
        ),
        outline: cn(
          "bg-transparent text-success border-success",
          classes?.color?.success?.outline
        ),
        soft: cn(
          "bg-success/10 text-success border-success/10",
          classes?.color?.success?.soft
        ),
      },
      info: {
        solid: cn(
          "bg-info text-white border-info",
          classes?.color?.info?.solid
        ),
        outline: cn(
          "bg-transparent text-info border-info",
          classes?.color?.info?.outline
        ),
        soft: cn(
          "bg-info/10 text-info border-info/10",
          classes?.color?.info?.soft
        ),
      },
      warning: {
        solid: cn(
          "bg-warning text-white border-warning",
          classes?.color?.warning?.solid
        ),
        outline: cn(
          "bg-transparent text-warning border-warning",
          classes?.color?.warning?.outline
        ),
        soft: cn(
          "bg-warning/10 text-warning border-warning/10",
          classes?.color?.warning?.soft
        ),
      },
      danger: {
        solid: cn(
          "bg-danger text-white border-danger",
          classes?.color?.danger?.solid
        ),
        outline: cn(
          "bg-transparent text-danger border-danger",
          classes?.color?.danger?.outline
        ),
        soft: cn(
          "bg-danger/10 text-danger border-danger/10",
          classes?.color?.danger?.soft
        ),
      },
      dark: {
        solid: cn(
          "bg-dark text-white border-dark",
          classes?.color?.dark?.solid
        ),
        outline: cn(
          "bg-transparent text-dark border-dark",
          classes?.color?.dark?.outline
        ),
        soft: cn(
          "bg-dark/10 text-dark border-dark/10",
          classes?.color?.dark?.soft
        ),
      },
      light: {
        solid: cn(
          "bg-light text-dark border-light",
          classes?.color?.light?.solid
        ),
        outline: cn(
          "bg-transparent text-dark border-light",
          classes?.color?.light?.outline
        ),
        soft: cn(
          "bg-light/10 text-dark border-light/10",
          classes?.color?.light?.soft
        ),
      },
    };
    return colors?.[color]?.[variant] ?? null;
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
