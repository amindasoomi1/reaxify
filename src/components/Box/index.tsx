import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType } from "react";

export default function Box<E extends ElementType = "div">({
  as,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((s) => s.box);
  const Component = as || "div";
  return <Component className={cn(classes?.base, className)} {...props} />;
}
