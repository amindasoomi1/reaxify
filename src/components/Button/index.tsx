import {
  ButtonSize,
  ButtonVariant,
  Color,
  ComponentPropsWithAs,
} from "@/types";
import { ElementType, MouseEvent, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "../../helpers";
import { useClasses, useCreateRipple } from "../../hooks";
import { AlertContext } from "../Alert";
import { ButtonGroupContext } from "../ButtonGroup";
import { DrawerContext } from "../Drawer";
import { ModalContext } from "../Modal";
import Spinner from "../Spinner";

export type ButtonProps = {
  variant?: ButtonVariant;
  color?: Color;
  size?: ButtonSize;
  loading?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  closeModal?: boolean;
  closeDrawer?: boolean;
};
type Colors = {
  [key in Color]?: {
    [key in ButtonVariant]?: string;
  };
};
type Sizes = {
  [key in ButtonSize]?: string;
};

export default function Button<E extends ElementType = "button">({
  as,
  variant: initVariant,
  color: initColor,
  size: initSize,
  loading: initLoading,
  stopPropagation = false,
  preventDefault = false,
  closeModal = false,
  closeDrawer = false,
  className,
  onClick,
  children,
  disabled,
  ...props
}: ComponentPropsWithAs<E, ButtonProps>) {
  const classes = useClasses((c) => c.button);
  const buttonGroupContext = useContext(ButtonGroupContext);
  const modalContext = useContext(ModalContext);
  const drawerContext = useContext(DrawerContext);
  const alertContext = useContext(AlertContext);
  const createRipple = useCreateRipple();
  const Component = as || "button";
  const variant =
    initVariant ??
    buttonGroupContext.variant ??
    alertContext.buttonVariant ??
    "solid";
  const color =
    initColor ?? buttonGroupContext.color ?? alertContext.color ?? "primary";
  const size = initSize ?? buttonGroupContext.size ?? "md";
  const loading = initLoading ?? buttonGroupContext.loading ?? false;
  const colorClasses = useMemo(() => {
    if (!color) return "border-transparent";
    const colors: Colors = {
      primary: {
        solid: "bg-primary text-white border-primary",
        outline: "bg-transparent text-primary border-primary",
        text: "bg-transparent text-primary border-transparent",
      },
      secondary: {
        solid: "bg-secondary text-white border-secondary",
        outline: "bg-transparent text-secondary border-secondary",
        text: "bg-transparent text-secondary border-transparent",
      },
      success: {
        solid: "bg-success text-white border-success",
        outline: "bg-transparent text-success border-success",
        text: "bg-transparent text-success border-transparent",
      },
      info: {
        solid: "bg-info text-white border-info",
        outline: "bg-transparent text-info border-info",
        text: "bg-transparent text-info border-transparent",
      },
      warning: {
        solid: "bg-warning text-white border-warning",
        outline: "bg-transparent text-warning border-warning",
        text: "bg-transparent text-warning border-transparent",
      },
      danger: {
        solid: "bg-danger text-white border-danger",
        outline: "bg-transparent text-danger border-danger",
        text: "bg-transparent text-danger border-transparent",
      },
      dark: {
        solid: "bg-dark text-white border-dark",
        outline: "bg-transparent text-dark border-dark",
        text: "bg-transparent text-dark border-transparent",
      },
      light: {
        solid: "bg-light text-dark border-light",
        outline: "bg-transparent text-dark border-light",
        text: "bg-transparent text-dark border-transparent",
      },
    };
    const classesResult = classes?.color?.[color]?.[variant];
    const colorResult = colors?.[color]?.[variant];
    return twMerge(colorResult, classesResult);
  }, [color, variant, classes?.color]);
  const loadingClasses = useMemo(() => {
    return colorClasses?.split(" ").find((e) => e.startsWith("text-"));
  }, [colorClasses]);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "text-base py-1 px-3.5",
      md: "text-base py-1.5 px-4",
      lg: "text-lg py-2 px-6",
      icon: "size-9 p-0 inline-flex items-center justify-center rounded-full [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
    };
    return [sizes?.[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  const loadingDisabledClasses = useMemo(() => {
    if (loading)
      return cn(
        "disabled:opacity-100 disabled:cursor-wait disabled:text-transparent",
        classes?.loading?.active,
      );
    return cn(
      "disabled:opacity-75 disabled:cursor-not-allowed",
      classes?.loading?.inactive,
    );
  }, [loading, classes?.loading]);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    createRipple(e);
    closeModal && modalContext.onClose();
    closeDrawer && drawerContext.onClose();
    stopPropagation && e.stopPropagation();
    preventDefault && e.preventDefault();
    onClick?.(e);
  };
  return (
    <Component
      role="button"
      className={twMerge(
        "relative inline-block no-underline whitespace-nowrap font-medium text-center rounded border border-[#e8eaee] cursor-pointer transition-[box-shadow,opacity,color,background-color,border-color] [user-select:none]",
        // "focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        // variant === "solid"
        //   ? "shadow hover:shadow-md active:shadow-lg"
        //   : "shadow-none",
        // color ? "ring-2 ring-offset-2 ring-transparent" : null,
        classes?.base,
        colorClasses,
        sizeClasses,
        loadingDisabledClasses,
        buttonGroupContext.buttonClasses,
        className,
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && (
        <span className="absolute inset-0 size-full flex items-center justify-center bg-transparent p-2">
          <Spinner
            size={size === "icon" ? "sm" : size}
            color={null}
            className={loadingClasses}
          />
        </span>
      )}
      <span className="ripple-group absolute size-full inset-0 overflow-hidden rounded-[inherit] pointer-events-none"></span>
    </Component>
  );
}
