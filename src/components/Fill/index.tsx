import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

export default function Fill<E extends ElementType = "div">({
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.fill.base);
  return (
    <div
      data-name="fill"
      className={twMerge("flex-1", classes, className)}
      {...props}
    ></div>
  );
}
