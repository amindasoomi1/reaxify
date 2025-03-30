import { ComponentPropsWithAs } from "@/types";
import { createContext, ElementType, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "../Button";
import { TabsContext } from "../Tabs";

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
  const { buttonGroupClasses } = useContext(TabsContext);
  const orientationClasses = useMemo(() => {
    const orientations = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };
    return orientations[orientation];
  }, [orientation]);
  const buttonClasses = useMemo(() => {
    const orientations = {
      horizontal: "rounded-none first-of-type:rounded-s last-of-type:rounded-e",
      vertical: "rounded-none first-of-type:rounded-t last-of-type:rounded-b",
    };
    return orientations[orientation];
  }, [orientation]);
  return (
    <Component
      className={twMerge(
        "w-fit flex items-stretch justify-center",
        orientationClasses,
        buttonGroupClasses,
        className
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
