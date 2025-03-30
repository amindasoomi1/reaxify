import { cn } from "@/helpers";
import { Color, ComponentPropsWithAs } from "@/types";
import { ElementType, MouseEvent, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { useCreateRipple } from "../../hooks";
import { ButtonGroupContext } from "../ButtonGroup";
import { DrawerContext } from "../Drawer";
import { ModalContext } from "../Modal";

type Variant = "solid" | "outline" | "text";
type Size = "sm" | "md" | "lg";
export type ButtonProps = {
  variant?: Variant;
  color?: Color | null;
  size?: Size;
  loading?: boolean;
  stopPropagation?: boolean;
  closeModal?: boolean;
  closeDrawer?: boolean;
};
type Colors = {
  [key in Color]?: {
    [key in Variant]?: string;
  };
};
type Sizes = {
  [key in Size]?: string;
};

export default function Button<E extends ElementType = "button">({
  as,
  variant: initVariant,
  color: initColor,
  size: initSize,
  loading: initLoading,
  stopPropagation = false,
  closeModal = false,
  closeDrawer = false,
  className,
  onClick,
  children,
  ...props
}: ComponentPropsWithAs<E, ButtonProps>) {
  const buttonGroupContext = useContext(ButtonGroupContext);
  const modalContext = useContext(ModalContext);
  const drawerContext = useContext(DrawerContext);
  const createRipple = useCreateRipple();
  const Component = as || "button";
  const variant = initVariant ?? buttonGroupContext.variant ?? "solid";
  const color = useMemo(() => {
    if (initColor !== undefined) return initColor;
    if (buttonGroupContext.color !== undefined) return buttonGroupContext.color;
    return "primary";
  }, [initColor, buttonGroupContext.color]);
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
    return colors?.[color]?.[variant] ?? null;
  }, [color, variant]);
  const loadingClasses = useMemo(() => {
    return colorClasses?.split(" ").find((e) => e.startsWith("text-"));
  }, [colorClasses]);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "text-base py-1 px-3.5",
      md: "text-base py-1.5 px-4",
      lg: "text-lg py-2 px-5",
    };
    return sizes?.[size];
  }, [size]);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    createRipple(e);
    closeModal && modalContext.onClose();
    closeDrawer && drawerContext.onClose();
    stopPropagation && e.stopPropagation();
    onClick?.(e);
  };
  return (
    <Component
      className={twMerge(
        "relative inline-block no-underline whitespace-nowrap font-medium text-center rounded border shadow cursor-pointer hover:shadow-md transition-[box-shadow,opacity,color,background-color,border-color]",
        colorClasses,
        sizeClasses,
        loading
          ? "disabled:opacity-100 disabled:cursor-wait disabled:text-transparent"
          : "disabled:opacity-75 disabled:cursor-not-allowed active:shadow-lg",
        buttonGroupContext.buttonClasses,
        className
      )}
      onClick={handleClick}
      disabled={props.disabled || loading}
      {...props}
    >
      {children}
      {loading && (
        <span className="absolute inset-0 size-full flex items-center justify-center bg-transparent p-2">
          <span
            className={cn(
              "h-full aspect-square rounded-full border-4 border-current border-l-transparent animate-spin",
              loadingClasses
            )}
          />
        </span>
      )}
      <span className="ripple-group absolute size-full inset-0 overflow-hidden pointer-events-none"></span>
    </Component>
  );
}
