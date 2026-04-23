import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import {
  AlertVariant,
  Color,
  ComponentPropsWithAs,
  ComponentPropsWithoutAs,
} from "@/types";
import { createContext, ElementType, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Fill from "../Fill";
import Stack from "../Stack";
import Typography from "../Typography";

type AlertProps = {
  variant?: AlertVariant;
  color?: Color;
};
type AlertContextType = {
  color: Color;
};
type Colors = {
  [key in Color]?: {
    [key in AlertVariant]?: string;
  };
};

const AlertContext = createContext<AlertContextType>({ color: "primary" });

function Alert<E extends ElementType = "div">({
  as,
  variant = "solid",
  color = "primary",
  children,
  className,
  ...props
}: ComponentPropsWithAs<E, AlertProps>) {
  const classes = useClasses((c) => c.alert);

  const colorClasses = useMemo(() => {
    const colors: Colors = {
      primary: {
        solid: "bg-primary text-white border-primary",
        outline: "bg-transparent text-primary border-primary",
        soft: "bg-primary/10 text-primary border-primary/10",
      },
      secondary: {
        solid: "bg-secondary text-white border-secondary",
        outline: "bg-transparent text-secondary border-secondary",
        soft: "bg-secondary/10 text-secondary border-secondary/10",
      },
      success: {
        solid: "bg-success text-white border-success",
        outline: "bg-transparent text-success border-success",
        soft: "bg-success/10 text-success border-success/10",
      },
      info: {
        solid: "bg-info text-white border-info",
        outline: "bg-transparent text-info border-info",
        soft: "bg-info/10 text-info border-info/10",
      },
      warning: {
        solid: "bg-warning text-white border-warning",
        outline: "bg-transparent text-warning border-warning",
        soft: "bg-warning/10 text-warning border-warning/10",
      },
      danger: {
        solid: "bg-danger text-white border-danger",
        outline: "bg-transparent text-danger border-danger",
        soft: "bg-danger/10 text-danger border-danger/10",
      },
      dark: {
        solid: "bg-dark text-white border-dark",
        outline: "bg-transparent text-dark border-dark",
        soft: "bg-dark/10 text-dark border-dark/10",
      },
      light: {
        solid: "bg-light text-dark border-light",
        outline: "bg-transparent text-dark border-light",
        soft: "bg-light/10 text-dark border-light/10",
      },
    };
    const classesResult = classes?.color?.[color]?.[variant];
    const colorResult = colors?.[color]?.[variant];
    return twMerge(colorResult, classesResult);
  }, [color, variant, classes?.color]);
  return (
    <Stack
      as={as as ElementType}
      className={cn(
        "w-full border rounded py-1.5 px-4 gap-3",
        classes?.base,
        colorClasses,
        className,
      )}
      {...props}
    >
      <AlertContext.Provider value={{ color }}>
        {children}
      </AlertContext.Provider>
    </Stack>
  );
}
function AlertIcon({
  children,
  className,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  return (
    <div
      className={twMerge(
        "flex flex-col py-2 items-start justify-start *:size-[1.375rem] *:text-current",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
function AlertContent({
  children,
  className,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  return (
    <Fill
      as="div"
      className={twMerge("py-2 space-y-0.5", className)}
      {...props}
    >
      {children}
    </Fill>
  );
}
function AlertTitle({
  children,
  className,
  ...props
}: ComponentPropsWithoutAs<typeof Typography<"h6">>) {
  return (
    <Typography
      as="h6"
      variant="body-1"
      className={twMerge("w-full -mt-px font-medium", className)}
      {...props}
    >
      {children}
    </Typography>
  );
}
function AlertDescription({
  children,
  className,
  ...props
}: ComponentPropsWithoutAs<typeof Typography<"p">>) {
  return (
    <Typography
      variant="body-2"
      className={twMerge("w-full font-normal", className)}
      {...props}
    >
      {children}
    </Typography>
  );
}
function AlertAction({
  children,
  className,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  return (
    <div className={twMerge("", className)} {...props}>
      {children}
    </div>
  );
}

Alert.Icon = AlertIcon;
Alert.Content = AlertContent;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Action = AlertAction;

export default Alert;
