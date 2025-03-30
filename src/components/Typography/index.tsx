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
type Variants = { [key in Variant]: string };

export default function Typography<E extends Component = "p">({
  as,
  variant = "body-1",
  className,
  ...props
}: ComponentPropsWithAs<E, TypographyProps>) {
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
      "heading-1": "text-5xl font-semibold",
      "heading-2": "text-4xl font-semibold",
      "heading-3": "text-3xl font-semibold",
      "heading-4": "text-2xl font-semibold",
      "heading-5": "text-xl font-medium",
      "heading-6": "text-lg font-medium",
      "body-1": "text-base font-normal",
      "body-2": "text-sm font-normal",
    };
    return variants[variant];
  }, [variant]);
  return (
    <Component className={twMerge("", variantClasses, className)} {...props} />
  );
}
