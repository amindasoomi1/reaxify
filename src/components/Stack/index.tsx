import { ComponentPropsWithAs } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Variants = "vertical" | "horizontal";
type StackProps = { variant?: Variants; wrap?: boolean };
type VariantsObject = { [key in Variants]: string };

export default function Stack<E extends ElementType = "div">({
  as,
  variant = "horizontal",
  wrap = false,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, StackProps>) {
  const Component = as || "div";
  const variantClasses = useMemo(() => {
    const variants: VariantsObject = {
      horizontal: "flex-row *:min-w-0",
      vertical: "flex-col *:min-h-0",
    };
    return variants[variant];
  }, [variant]);
  return (
    <Component
      className={twMerge(
        "w-full flex",
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
