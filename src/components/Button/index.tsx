import { Color, ComponentPropsWithAs, Size } from "@/types";
import { ElementType, MouseEvent, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "../../helpers";
import { useClasses, useCreateRipple } from "../../hooks";
import { ButtonGroupContext } from "../ButtonGroup";
import { DrawerContext } from "../Drawer";
import { ModalContext } from "../Modal";
import Spinner from "../Spinner";

type Variant = "solid" | "outline" | "text";
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
  const classes = useClasses((c) => c.button);
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
        solid: cn(
          "bg-primary text-white border-primary focus:ring-primary focus-visible:ring-primary",
          classes?.color?.primary?.solid
        ),
        outline: cn(
          "bg-transparent text-primary border-primary focus:ring-primary focus-visible:ring-primary",
          classes?.color?.primary?.outline
        ),
        text: cn(
          "bg-transparent text-primary border-transparent focus:ring-primary focus-visible:ring-primary",
          classes?.color?.primary?.text
        ),
      },
      secondary: {
        solid: cn(
          "bg-secondary text-white border-secondary focus:ring-secondary focus-visible:ring-secondary",
          classes?.color?.secondary?.solid
        ),
        outline: cn(
          "bg-transparent text-secondary border-secondary focus:ring-secondary focus-visible:ring-secondary",
          classes?.color?.secondary?.outline
        ),
        text: cn(
          "bg-transparent text-secondary border-transparent focus:ring-secondary focus-visible:ring-secondary",
          classes?.color?.secondary?.text
        ),
      },
      success: {
        solid: cn(
          "bg-success text-white border-success focus:ring-success focus-visible:ring-success",
          classes?.color?.success?.solid
        ),
        outline: cn(
          "bg-transparent text-success border-success focus:ring-success focus-visible:ring-success",
          classes?.color?.success?.outline
        ),
        text: cn(
          "bg-transparent text-success border-transparent focus:ring-success focus-visible:ring-success",
          classes?.color?.success?.text
        ),
      },
      info: {
        solid: cn(
          "bg-info text-white border-info focus:ring-info focus-visible:ring-info",
          classes?.color?.info?.solid
        ),
        outline: cn(
          "bg-transparent text-info border-info focus:ring-info focus-visible:ring-info",
          classes?.color?.info?.outline
        ),
        text: cn(
          "bg-transparent text-info border-transparent focus:ring-info focus-visible:ring-info",
          classes?.color?.info?.text
        ),
      },
      warning: {
        solid: cn(
          "bg-warning text-white border-warning focus:ring-warning focus-visible:ring-warning",
          classes?.color?.warning?.solid
        ),
        outline: cn(
          "bg-transparent text-warning border-warning focus:ring-warning focus-visible:ring-warning",
          classes?.color?.warning?.outline
        ),
        text: cn(
          "bg-transparent text-warning border-transparent focus:ring-warning focus-visible:ring-warning",
          classes?.color?.warning?.text
        ),
      },
      danger: {
        solid: cn(
          "bg-danger text-white border-danger focus:ring-danger focus-visible:ring-danger",
          classes?.color?.danger?.solid
        ),
        outline: cn(
          "bg-transparent text-danger border-danger focus:ring-danger focus-visible:ring-danger",
          classes?.color?.danger?.outline
        ),
        text: cn(
          "bg-transparent text-danger border-transparent focus:ring-danger focus-visible:ring-danger",
          classes?.color?.danger?.text
        ),
      },
      dark: {
        solid: cn(
          "bg-dark text-white border-dark focus:ring-dark focus-visible:ring-dark",
          classes?.color?.dark?.solid
        ),
        outline: cn(
          "bg-transparent text-dark border-dark focus:ring-dark focus-visible:ring-dark",
          classes?.color?.dark?.outline
        ),
        text: cn(
          "bg-transparent text-dark border-transparent focus:ring-dark focus-visible:ring-dark",
          classes?.color?.dark?.text
        ),
      },
      light: {
        solid: cn(
          "bg-light text-dark border-light focus:ring-light focus-visible:ring-light",
          classes?.color?.light?.solid
        ),
        outline: cn(
          "bg-transparent text-dark border-light focus:ring-light focus-visible:ring-light",
          classes?.color?.light?.outline
        ),
        text: cn(
          "bg-transparent text-dark border-transparent focus:ring-light focus-visible:ring-light",
          classes?.color?.light?.text
        ),
      },
    };
    return colors?.[color]?.[variant] ?? null;
  }, [color, variant, classes?.color]);
  const loadingClasses = useMemo(() => {
    return colorClasses?.split(" ").find((e) => e.startsWith("text-"));
  }, [colorClasses]);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: cn("text-base py-1 px-3.5", classes?.size?.sm),
      md: cn("text-base py-1.5 px-4", classes?.size?.md),
      lg: cn("text-lg py-2 px-6", classes?.size?.lg),
    };
    return sizes?.[size];
  }, [size, classes?.size]);
  const loadingDisabledClasses = useMemo(() => {
    if (loading)
      return cn(
        "disabled:opacity-100 disabled:cursor-wait disabled:text-transparent",
        classes?.loading?.active
      );
    return cn(
      "disabled:opacity-75 disabled:cursor-not-allowed",
      classes?.loading?.active
    );
  }, [loading, classes?.loading]);
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
        "relative inline-block no-underline whitespace-nowrap font-medium text-center rounded border border-[#e8eaee] cursor-pointer transition-[box-shadow,opacity,color,background-color,border-color]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variant === "solid"
          ? "shadow hover:shadow-md active:shadow-lg"
          : "shadow-none",
        // color ? "ring-2 ring-offset-2 ring-transparent" : null,
        classes?.base,
        colorClasses,
        sizeClasses,
        loadingDisabledClasses,
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
          <Spinner size={size} color={null} className={loadingClasses} />
        </span>
      )}
      <span className="ripple-group absolute size-full inset-0 overflow-hidden rounded-[inherit] pointer-events-none"></span>
    </Component>
  );
}
