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
      primary: "border-primary",
      secondary: "border-secondary",
      success: "border-success",
      info: "border-info",
      warning: "border-warning",
      danger: "border-danger",
      dark: "border-dark",
      light: "border-light",
    };
    return [colors?.[color], classes?.color?.[color]];
  }, [color, classes?.color]);
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: "border-2 size-4",
      md: "border-3 size-6",
      lg: "border-4 size-8",
    };
    return [sizes?.[size], classes?.size?.[size]];
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
