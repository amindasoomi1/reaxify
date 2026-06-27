import { asComponent } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

export default function Fill<E extends ElementType = "div">({
  as,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.fill.base);
  const Component = asComponent(as, "div");
  return (
    <Component
      data-name="fill"
      className={twMerge("flex-1", classes, className)}
      {...props}
    />
  );
}
