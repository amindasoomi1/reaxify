import { Color } from "@/types";
import { ComponentProps, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type BaseProgressProps = {
  color?: Color | null;
  value: number;
  children?: never;
};
type Colors = {
  [key in Color]?: string;
};
type ProgressProps = BaseProgressProps &
  Omit<ComponentProps<"div">, keyof BaseProgressProps>;

export default function Progress({
  color = "primary",
  value = 0,
  className,
  ...props
}: ProgressProps) {
  const colorClasses = useMemo(() => {
    if (!color) return "border-transparent";
    const colors: Colors = {
      primary: "bg-primary/15 text-primary",
      secondary: "bg-secondary/15 text-secondary",
      success: "bg-success/15 text-success",
      info: "bg-info/15 text-info",
      warning: "bg-warning/15 text-warning",
      danger: "bg-danger/15 text-danger",
      dark: "bg-dark/15 text-dark",
      light: "bg-light/15 text-light",
    };
    return colors?.[color] ?? null;
  }, [color]);
  return (
    <div
      className={twMerge(
        "block w-full h-2.5 rounded-full overflow-hidden",
        colorClasses,
        className
      )}
      {...props}
    >
      <span
        style={{ width: `${value}%` }}
        className="block h-full max-w-full bg-current rounded-[inherit] transition-[width]"
      ></span>
    </div>
  );
}
