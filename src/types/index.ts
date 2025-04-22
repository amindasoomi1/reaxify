import { ComponentProps, ElementType, ReactNode } from "react";

export type ComponentPropsWithoutAs<
  E extends ElementType,
  // eslint-disable-next-line
  P extends Record<string, unknown> = {}
> = P & Omit<ComponentProps<E>, keyof P>;
export type ComponentPropsWithAs<
  E extends ElementType,
  // eslint-disable-next-line
  P extends Record<string, unknown> = {}
> = P & { as?: E } & Omit<ComponentProps<E>, "as" | keyof P>;
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "dark"
  | "light";
export type ChildrenProps = {
  children?: ReactNode;
};
export type Size = "sm" | "md" | "lg";
export type Rule = (value: string) => true | string;
export type Rules = Rule[];
export type ToggleProps = { open?: boolean; onClose?: VoidFunction };
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
