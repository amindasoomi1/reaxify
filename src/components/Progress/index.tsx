import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { Color } from "@/types";
import { ComponentProps, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type ValueAnimation =
  | {
      value: number;
      animate?: never;
    }
  | {
      value?: never;
      animate: boolean;
    };
type BaseProgressProps = {
  color?: Color | null;
  children?: never;
} & ValueAnimation;
type Colors = {
  [key in Color]?: string;
};
type ProgressProps = BaseProgressProps &
  Omit<ComponentProps<"div">, keyof BaseProgressProps>;

export default function Progress({
  color = "primary",
  value = 0,
  animate = false,
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
  const width = useMemo(() => {
    if (animate) return undefined;
    return `${Math.max(value, 0)}%`;
  }, [value, animate]);
  return (
    <div
      className={twMerge(
        "relative block w-full h-2.5 rounded-full overflow-hidden",
        classes?.base,
        colorClasses,
        className
      )}
      {...props}
    >
      <span
        style={{ width }}
        className={cn(
          "absolute h-full max-w-full bg-current rounded-[inherit] top-0 bottom-0 start-0",
          animate ? "animate-linear-progress-1" : "transition-[width]"
        )}
      />
      {animate && (
        <span className="absolute h-full max-w-full bg-current rounded-[inherit] top-0 bottom-0 start-0 animate-linear-progress-2" />
      )}
    </div>
  );
}
