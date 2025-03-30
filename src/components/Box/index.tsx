import { ComponentPropsWithAs } from "@/types";
import { ElementType } from "react";

export default function Box<E extends ElementType = "div">({
  as,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "div";
  return <Component {...props} />;
}
