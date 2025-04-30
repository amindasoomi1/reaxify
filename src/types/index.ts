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
export type BadgeVariant = "solid" | "outline" | "soft";
export type ButtonVariant = "solid" | "outline" | "text";
export type TypographyVariant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "heading-6"
  | "body-1"
  | "body-2";
export type ClassNameProps = {
  className?: string;
};
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
