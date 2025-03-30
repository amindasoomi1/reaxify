import { ComponentProps, ElementType } from "react";

export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "dark"
  | "light";
export type ComponentPropsWithAs<
  E extends ElementType,
  P extends Record<string, unknown>
> = { as?: E } & P & Omit<ComponentProps<E>, "as" | keyof P>;
export type ClassNameProps = { className?: string };
