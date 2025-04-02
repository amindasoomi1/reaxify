import { ComponentProps, ElementType, ReactNode } from "react";
import { TransitionStatus } from "react-transition-group";

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
export type Callback = () => void;
export type Rule = (value: string) => true | string;
export type Rules = Rule[];
export type ToggleProps = { open?: boolean; onClose?: Callback };
export type TransitionClasses = { [key in TransitionStatus]: string };
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
