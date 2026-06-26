import { useClasses } from "@/hooks";
import { Color, ComponentPropsWithoutAs, Size } from "@/types";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  color?: Color;
  inheritColor?: boolean;
  size?: Size;
  children?: never;
};

export default function Spinner({
  color = "primary",
  inheritColor = false,
  size = "md",
  className,
  ...props
}: ComponentPropsWithoutAs<"span", Props>) {
  const classes = useClasses((s) => s.spinner);
  const colorClasses = useMemo(() => {
    if (inheritColor) return "border-current";
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
  }, [color, inheritColor, classes?.color]);
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: "border-2 w-4",
      md: "border-3 w-6",
      lg: "border-4 w-8",
    };
    const sizeResult = sizes?.[size] ?? sizes.md;
    const classesResult = classes?.size?.[size];
    const hiddenClasses =
      "border-e-transparent! border-e-0! border-s-transparent! border-t-0!";
    return [sizeResult, classesResult, hiddenClasses];
  }, [size, classes?.size]);
  return (
    <span
      data-name="spinner"
      className={twMerge(
        "inline-block align-middle rounded-full animate-spin aspect-square",
        classes?.base,
        colorClasses,
        sizeClasses,
        className,
      )}
      {...props}
    />
  );
}
