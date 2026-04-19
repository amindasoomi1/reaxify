import { ComponentProps, ElementType, ReactNode } from "react";

export type ComponentPropsWithoutAs<
  E extends ElementType,
  // eslint-disable-next-line
  P extends Record<string, unknown> = {},
> = P & Omit<ComponentProps<E>, keyof P>;
export type ComponentPropsWithAs<
  E extends ElementType,
  // eslint-disable-next-line
  P extends Record<string, unknown> = {},
> = P & { as?: E } & Omit<ComponentProps<E>, "as" | keyof P>;

export interface ExtendBadgeVariant {}
export interface ExtendButtonVariant {}
export interface ExtendTypographyVariant {}
export interface ExtendColor {}
export interface ExtendSize {}

type BaseBadgeVariant = "solid" | "outline" | "soft";
type BaseButtonVariant = "solid" | "outline" | "text";
type BaseTypographyVariant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "heading-6"
  | "body-1"
  | "body-2"
  | "body-3";
type BaseColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "dark"
  | "light";
type BaseSize = "sm" | "md" | "lg";

export type BadgeVariant = BaseBadgeVariant | keyof ExtendBadgeVariant;
export type ButtonVariant = BaseButtonVariant | keyof ExtendButtonVariant;
export type TypographyVariant =
  | BaseTypographyVariant
  | keyof ExtendTypographyVariant;
export type Color = BaseColor | keyof ExtendColor;
export type Size = BaseSize | keyof ExtendSize;

export type ClassNameProps = { className?: string };
export type ChildrenProps = { children?: ReactNode };
export type ToggleProps = { open: boolean; onClose: VoidFunction };
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
