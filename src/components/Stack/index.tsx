import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Variants = "vertical" | "horizontal";
type StackProps = {
  variant?: Variants;
  wrap?: boolean | "reverse";
  reverse?: boolean;
};
type VariantsObject = { [key in Variants]: string | undefined };

export default function Stack<E extends ElementType = "div">({
  as,
  variant = "horizontal",
  wrap = false,
  reverse = false,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, StackProps>) {
  const classes = useClasses((c) => c.stack);
  const Component = as || "div";
  const variantClasses = useMemo(() => {
    const variants: VariantsObject = {
      horizontal: cn(
        "*:min-w-0",
        reverse ? "flex-row-reverse" : "flex-row",
        classes?.variants?.horizontal
      ),
      vertical: cn(
        "*:min-h-0",
        reverse ? "flex-col-reverse" : "flex-col",
        classes?.variants?.vertical
      ),
    };
    return variants[variant];
  }, [variant, reverse, classes?.variants]);
  const wrapClasses = useMemo(() => {
    if (wrap === "reverse") return "flex-wrap-reverse";
    if (wrap) return "flex-wrap";
    return null;
  }, [wrap]);
  return (
    <Component
      className={twMerge(
        "flex",
        classes?.base,
        variantClasses,
        wrapClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
