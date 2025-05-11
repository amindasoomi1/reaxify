import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Variants = "vertical" | "horizontal";
type StackProps = { variant?: Variants; wrap?: boolean };
type VariantsObject = { [key in Variants]: string | undefined };

export default function Stack<E extends ElementType = "div">({
  as,
  variant = "horizontal",
  wrap = false,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, StackProps>) {
  const classes = useClasses((c) => c.stack);
  const Component = as || "div";
  const variantClasses = useMemo(() => {
    const variants: VariantsObject = {
      horizontal: cn("flex-row *:min-w-0", classes?.variants?.horizontal),
      vertical: cn("flex-col *:min-h-0", classes?.variants?.vertical),
    };
    return variants[variant];
  }, [variant, classes?.variants]);
  return (
    <Component
      className={twMerge(
        "flex",
        classes?.base,
        variantClasses,
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
