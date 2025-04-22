import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { Color, ComponentPropsWithoutAs, Size } from "@/types";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  color?: Color | null;
  size?: Size;
  children?: never;
};

export default function Spinner({
  color = "primary",
  size = "md",
  className,
  ...props
}: ComponentPropsWithoutAs<"span", Props>) {
  const classes = useClasses((s) => s.spinner);
  const colorClasses = useMemo(() => {
    if (!color) return "border-current";
    const colors = {
      primary: cn("border-primary", classes?.color?.primary),
      secondary: cn("border-secondary", classes?.color?.secondary),
      success: cn("border-success", classes?.color?.success),
      info: cn("border-info", classes?.color?.info),
      warning: cn("border-warning", classes?.color?.warning),
      danger: cn("border-danger", classes?.color?.danger),
      dark: cn("border-dark", classes?.color?.dark),
      light: cn("border-light", classes?.color?.light),
    };
    return colors?.[color] ?? null;
  }, [color, classes?.color]);
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: cn("border-2 size-4", classes?.size?.sm),
      md: cn("border-3 size-6", classes?.size?.md),
      lg: cn("border-4 size-8", classes?.size?.lg),
    };
    return sizes?.[size];
  }, [size, classes?.size]);
  return (
    <span
      className={twMerge(
        "inline-block  align-middle rounded-full animate-spin",
        classes?.base,
        colorClasses,
        "border-l-transparent",
        sizeClasses,
        className
      )}
      {...props}
    />
  );
}
