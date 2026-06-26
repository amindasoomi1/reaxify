import { useClasses } from "@/hooks";
import { ComponentPropsWithAs, TypographyVariant } from "@/types";
import { ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type TypographyProps = {
  variant?: TypographyVariant;
};
type Components = { [key in TypographyVariant]: string };
type Variants = { [key in TypographyVariant]: string | undefined };

export default function Typography<E extends ElementType = "p">({
  as,
  variant = "body-1",
  className,
  ...props
}: ComponentPropsWithAs<E, TypographyProps>) {
  const classes = useClasses((c) => c.typography);
  const Component = useMemo(() => {
    const components: Components = {
      "heading-1": "h1",
      "heading-2": "h2",
      "heading-3": "h3",
      "heading-4": "h4",
      "heading-5": "h5",
      "heading-6": "h6",
      "body-1": "p",
      "body-2": "p",
      "body-3": "p",
    };
    return as || components[variant] || "p";
  }, [as, variant]);
  const variantClasses = useMemo(() => {
    const variants: Variants = {
      "heading-1": "text-5xl font-semibold",
      "heading-2": "text-4xl font-semibold",
      "heading-3": "text-3xl font-semibold",
      "heading-4": "text-2xl font-semibold",
      "heading-5": "text-xl font-medium",
      "heading-6": "text-lg font-medium",
      "body-1": "text-base font-normal",
      "body-2": "text-sm font-normal",
      "body-3": "text-xs font-normal",
    };
    return [variants[variant], classes?.variant?.[variant]];
  }, [variant, classes?.variant]);
  return (
    <Component
      className={twMerge(classes?.base, variantClasses, className)}
      {...props}
    />
  );
}
