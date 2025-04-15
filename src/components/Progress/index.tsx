import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
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
  const classes = useClasses((c) => c.progress);
  const colorClasses = useMemo(() => {
    if (!color) return "border-transparent";
    const colors: Colors = {
      primary: cn("bg-primary/15 text-primary", classes?.color?.primary),
      secondary: cn(
        "bg-secondary/15 text-secondary",
        classes?.color?.secondary
      ),
      success: cn("bg-success/15 text-success", classes?.color?.success),
      info: cn("bg-info/15 text-info", classes?.color?.info),
      warning: cn("bg-warning/15 text-warning", classes?.color?.warning),
      danger: cn("bg-danger/15 text-danger", classes?.color?.danger),
      dark: cn("bg-dark/15 text-dark", classes?.color?.dark),
      light: cn("bg-light/15 text-light", classes?.color?.light),
    };
    return colors?.[color] ?? null;
  }, [color, classes?.color]);
  return (
    <div
      className={twMerge(
        "block w-full h-2.5 rounded-full overflow-hidden",
        classes?.base,
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
