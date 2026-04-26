import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { createContext, ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "../Button";

type ButtonGroupProps = {
  orientation?: "vertical" | "horizontal";
} & ButtonProps;
type Context = {
  buttonClasses?: string;
} & ButtonProps;

export const ButtonGroupContext = createContext<Context>({});

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
    return cn(orientationsResult, classesResult);
  }, [orientation, classes?.button]);
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
      <ButtonGroupContext.Provider
        value={{ variant, color, size, loading, buttonClasses }}
      >
        {children}
      </ButtonGroupContext.Provider>
    </Component>
  );
}
