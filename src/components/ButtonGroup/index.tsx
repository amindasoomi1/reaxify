import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import {
  Children,
  cloneElement,
  ElementType,
  isValidElement,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "../Button";

type ButtonGroupProps = {
  orientation?: "vertical" | "horizontal";
} & ButtonProps;

export default function ButtonGroup<E extends ElementType = "div">({
  as,
  variant,
  color,
  size,
  loading,
  orientation = "horizontal",
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, ButtonGroupProps>) {
  const Component = as || "div";
  const classes = useClasses((c) => c.buttonGroup);
  const orientationClasses = useMemo(() => {
    const orientations = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };

    return [orientations[orientation], classes?.orientation?.[orientation]];
  }, [orientation, classes?.orientation]);
  const buttonClasses = useMemo(() => {
    const orientations = {
      horizontal: "rounded-none first-of-type:rounded-s last-of-type:rounded-e",
      vertical: "rounded-none first-of-type:rounded-t last-of-type:rounded-b",
    };
    const classesResult = classes?.button?.orientation?.[orientation];
    const orientationsResult = orientations[orientation];
    return [orientationsResult, classesResult];
  }, [orientation, classes?.button]);
  const enhancedChildren = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement<ButtonProps>(child)) return child;
      const childProps = child.props;
      return cloneElement(child, {
        variant: childProps.variant ?? variant,
        color: childProps.color ?? color,
        size: childProps.size ?? size,
        loading: childProps.loading ?? loading,
        className: cn(...buttonClasses, childProps.className),
      });
    });
  }, [children, variant, color, size, loading, buttonClasses]);
  return (
    <Component
      className={twMerge(
        "w-fit flex items-stretch justify-center",
        classes?.base,
        orientationClasses,
        className,
      )}
      {...props}
    >
      {enhancedChildren}
    </Component>
  );
}
