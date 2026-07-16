import { asComponent, cn } from "@/helpers";
import { useClasses, useCreateRipple } from "@/hooks";
import {
  ButtonSize,
  ButtonVariant,
  Color,
  ComponentPropsWithAs,
} from "@/types";
import { ElementType, MouseEvent, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
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
  variant = "solid",
  color = "primary",
  size = "md",
  loading = false,
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
  const createRipple = useCreateRipple();
  const modalContext = useContext(ModalContext);
  const drawerContext = useContext(DrawerContext);
  const colorClasses = useMemo(() => {
    const colors: Colors = {
      primary: {
        solid:
          "bg-primary text-white border-primary hover:bg-dark-primary hover:border-dark-primary",
        outline:
          "bg-transparent text-primary border-primary hover:text-dark-primary hover:border-dark-primary",
        text: "bg-transparent text-primary border-transparent hover:text-dark-primary",
        soft: "bg-light-primary text-dark-primary border-light-primary hover:bg-primary hover:text-white hover:border-primary",
      },
      secondary: {
        solid:
          "bg-secondary text-white border-secondary hover:bg-dark-secondary hover:border-dark-secondary",
        outline:
          "bg-transparent text-secondary border-secondary hover:text-dark-secondary hover:border-dark-secondary",
        text: "bg-transparent text-secondary border-transparent hover:text-dark-secondary",
        soft: "bg-light-secondary text-dark-secondary border-light-secondary hover:bg-secondary hover:text-white hover:border-secondary",
      },
      success: {
        solid:
          "bg-success text-white border-success hover:bg-dark-success hover:border-dark-success",
        outline:
          "bg-transparent text-success border-success hover:text-dark-success hover:border-dark-success",
        text: "bg-transparent text-success border-transparent hover:text-dark-success",
        soft: "bg-light-success text-dark-success border-light-success hover:bg-success hover:text-white hover:border-success",
      },
      info: {
        solid:
          "bg-info text-white border-info hover:bg-dark-info hover:border-dark-info",
        outline:
          "bg-transparent text-info border-info hover:text-dark-info hover:border-dark-info",
        text: "bg-transparent text-info border-transparent hover:text-dark-info",
        soft: "bg-light-info text-dark-info border-light-info hover:bg-info hover:text-white hover:border-info",
      },
      warning: {
        solid:
          "bg-warning text-white border-warning hover:bg-dark-warning hover:border-dark-warning",
        outline:
          "bg-transparent text-warning border-warning hover:text-dark-warning hover:border-dark-warning",
        text: "bg-transparent text-warning border-transparent hover:text-dark-warning",
        soft: "bg-light-warning text-dark-warning border-light-warning hover:bg-warning hover:text-white hover:border-warning",
      },
      danger: {
        solid:
          "bg-danger text-white border-danger hover:bg-dark-danger hover:border-dark-danger",
        outline:
          "bg-transparent text-danger border-danger hover:text-dark-danger hover:border-dark-danger",
        text: "bg-transparent text-danger border-transparent hover:text-dark-danger",
        soft: "bg-light-danger text-dark-danger border-light-danger hover:bg-danger hover:text-white hover:border-danger",
      },
      dark: {
        solid:
          "bg-dark text-white border-dark hover:bg-black hover:border-black",
        outline:
          "bg-transparent text-dark border-dark hover:text-black hover:border-black",
        text: "bg-transparent text-dark border-transparent hover:text-black",
        soft: "bg-dark text-white border-dark hover:bg-black hover:text-white hover:border-black",
      },
      light: {
        solid:
          "bg-light text-dark border-light hover:bg-border hover:border-border",
        outline:
          "bg-transparent text-dark border-light hover:text-dark hover:border-dark",
        text: "bg-transparent text-dark border-transparent hover:text-dark",
        soft: "bg-light text-dark border-light hover:bg-border hover:border-border",
      },
    };
    const classesResult = classes?.color?.[color]?.[variant];
    const colorResult = colors?.[color]?.[variant];
    return cn(colorResult, classesResult);
  }, [color, variant, classes?.color]);
  const spinnerTextClass = useMemo(() => {
    return colorClasses?.split(" ").find((e) => e.startsWith("text-"));
  }, [colorClasses]);
  const sizeClasses = useMemo(() => {
    const sizes: Sizes = {
      sm: "text-sm py-1 px-3.5 [&_svg:not([class*='size-'])]:size-4",
      md: "text-base py-1.5 px-4 [&_svg:not([class*='size-'])]:size-5",
      lg: "text-xl py-1.5 px-6 [&_svg:not([class*='size-'])]:size-6",
      icon: "size-9 p-0 inline-flex items-center justify-center rounded-full [&_svg:not([class*='size-'])]:size-5",
    };
    return [sizes?.[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  const loadingDisabledClasses = useMemo(() => {
    if (loading)
      return [
        "disabled:opacity-100 disabled:cursor-wait disabled:text-transparent",
        classes?.loading?.active,
      ];
    return [
      "disabled:opacity-75 disabled:cursor-not-allowed",
      classes?.loading?.inactive,
    ];
  }, [loading, classes?.loading]);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    createRipple(e);
    closeModal && modalContext.dismiss();
    closeDrawer && drawerContext.dismiss();
    stopPropagation && e.stopPropagation();
    preventDefault && e.preventDefault();
    onClick?.(e);
  };
  const Component = asComponent(as, "button");
  return (
    <Component
      role="button"
      data-name="button"
      className={twMerge(
        "relative inline-flex items-center justify-center gap-1.5 no-underline whitespace-nowrap font-medium text-center rounded border border-border cursor-pointer transition-[box-shadow,opacity,color,background-color,border-color] [user-select:none] focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        classes?.base,
        colorClasses,
        sizeClasses,
        loadingDisabledClasses,
        className,
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && (
        <span
          className={cn(
            "absolute inset-0 size-full flex items-center justify-center bg-transparent p-2 pointer-events-none",
            spinnerTextClass,
          )}
        >
          <Spinner size={size === "icon" ? "sm" : size} inheritColor />
        </span>
      )}
      <span
        data-name="ripple-group"
        className="absolute size-full inset-0 overflow-hidden rounded-[inherit] pointer-events-none"
      ></span>
    </Component>
  );
}
