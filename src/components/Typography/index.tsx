import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Component =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label";
type Variant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "heading-6"
  | "body-1"
  | "body-2";

type TypographyProps = {
  variant?: Variant;
};
type Components = { [key in Variant]: string };
type Variants = { [key in Variant]: string | undefined };

export default function Typography<E extends Component = "p">({
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
    };
    return as || components[variant] || "p";
  }, [as, variant]);
  const variantClasses = useMemo(() => {
    const variants: Variants = {
      "heading-1": cn("text-5xl font-semibold", classes?.variant?.heading1),
      "heading-2": cn("text-4xl font-semibold", classes?.variant?.heading2),
      "heading-3": cn("text-3xl font-semibold", classes?.variant?.heading3),
      "heading-4": cn("text-2xl font-semibold", classes?.variant?.heading4),
      "heading-5": cn("text-xl font-medium", classes?.variant?.heading5),
      "heading-6": cn("text-lg font-medium", classes?.variant?.heading6),
      "body-1": cn("text-base font-normal", classes?.variant?.body1),
      "body-2": cn("text-sm font-normal", classes?.variant?.body2),
    };
    return variants[variant];
  }, [variant, classes?.variant]);
  return (
    <Component
      className={twMerge(classes?.base, variantClasses, className)}
      {...props}
    />
  );
}
