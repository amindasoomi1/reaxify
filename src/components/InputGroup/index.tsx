import { ComponentPropsWithAs } from "@/types";
import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

function InputGroup<E extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "div";
  return (
    <Component className={twMerge("w-full", className)} {...props}>
      {children}
    </Component>
  );
}
function InputGroupLabel<E extends ElementType = "h6">({
  as,
  children,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "h6";
  return (
    <Component
      className={twMerge(
        "block font-normal text-start mb-0.5 px-0.5 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
function InputGroupStack<E extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "div";
  return (
    <Component
      className={twMerge(
        "flex items-stretch border border-[#e8eaee]rounded divide-x transition-[border-color,box-shadow] [&>*:first-child]:rounded-s [&>*:last-child]:rounded-e focus-within:border-primary focus-within:divide-primary",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
function InputGroupText<E extends ElementType = "span">({
  as,
  children,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "span";
  return (
    <Component
      className={twMerge(
        "flex items-center text-base py-1.5 px-3 font-normal text-center whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
function InputGroupFormControl<E extends ElementType = "input">({
  as,
  children,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "input";
  return (
    <Component
      className={twMerge(
        "text-start flex-1 leading-10 text-base py-1.5 px-3 h-10 focus:outline-none bg-transparent border-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

InputGroup.Label = InputGroupLabel;
InputGroup.Stack = InputGroupStack;
InputGroup.Text = InputGroupText;
InputGroup.FormControl = InputGroupFormControl;

export default InputGroup;
