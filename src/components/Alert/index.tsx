import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import {
  AlertVariant,
  ButtonVariant,
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
  buttonVariant?: ButtonVariant;
  color?: Color;
};
type Colors = {
  [key in Color]?: {
    [key in AlertVariant]?: string;
  };
};

export const AlertContext = createContext<AlertContextType>({});

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
        soft: "bg-light-primary text-dark-primary border-light-primary",
      },
      secondary: {
        solid: "bg-secondary text-white border-secondary",
        outline: "bg-transparent text-secondary border-secondary",
        soft: "bg-light-secondary text-dark-secondary border-light-secondary",
      },
      success: {
        solid: "bg-success text-white border-success",
        outline: "bg-transparent text-success border-success",
        soft: "bg-light-success text-dark-success border-light-success",
      },
      info: {
        solid: "bg-info text-white border-info",
        outline: "bg-transparent text-info border-info",
        soft: "bg-light-info text-dark-info border-light-info",
      },
      warning: {
        solid: "bg-warning text-white border-warning",
        outline: "bg-transparent text-warning border-warning",
        soft: "bg-light-warning text-dark-warning border-light-warning",
      },
      danger: {
        solid: "bg-danger text-white border-danger",
        outline: "bg-transparent text-danger border-danger",
        soft: "bg-light-danger text-dark-danger border-light-danger",
      },
      dark: {
        solid: "bg-dark text-white border-dark",
        outline: "bg-transparent text-dark border-dark",
        soft: "bg-dark text-dark border-dark",
      },
      light: {
        solid: "bg-light text-dark border-light",
        outline: "bg-transparent text-dark border-light",
        soft: "bg-light text-dark border-light",
      },
    };
    const classesResult = classes?.color?.[color]?.[variant];
    const colorResult = colors?.[color]?.[variant];
    return twMerge(colorResult, classesResult);
  }, [color, variant, classes?.color]);
  const buttonVariant: ButtonVariant = useMemo(() => {
    if (variant === "solid") return "solid";
    return "text";
  }, [variant]);
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
      <AlertContext.Provider value={{ color, buttonVariant }}>
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
  const classes = useClasses((c) => c.alert?.icon?.base);
  return (
    <div
      className={twMerge(
        "flex flex-col py-2 items-start justify-start *:size-[1.375rem] *:text-current",
        classes,
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
  const classes = useClasses((c) => c.alert?.content.base);
  return (
    <Fill
      as="div"
      className={twMerge("py-2 space-y-0.5", classes, className)}
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
  const classes = useClasses((c) => c.alert?.title.base);
  return (
    <Typography
      as="h6"
      variant="body-1"
      className={twMerge("w-full -mt-px font-medium", classes, className)}
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
  const classes = useClasses((c) => c.alert?.description.base);
  return (
    <Typography
      variant="body-2"
      className={twMerge("w-full font-normal", classes, className)}
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
  const classes = useClasses((c) => c.alert?.action?.base);
  return (
    <div
      className={twMerge("self-center size-fit", classes, className)}
      {...props}
    >
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
