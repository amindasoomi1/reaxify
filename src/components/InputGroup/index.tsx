import { useClasses } from "@/hooks";
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
  const classes = useClasses((c) => c.inputGroup.base);
  return (
    <Component
      data-name="input-group"
      className={twMerge("w-full", classes, className)}
      {...props}
    >
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
  const classes = useClasses((c) => c.inputGroup.label.base);
  return (
    <Component
      data-name="input-group-label"
      className={twMerge(
        "block font-normal text-start mb-0.5 px-0.5 text-sm",
        classes,
        className,
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
  const classes = useClasses((c) => c.inputGroup.stack.base);
  return (
    <Component
      data-name="input-group-stack"
      className={twMerge(
        "flex items-stretch border border-border rounded divide-x divide-border transition-[border-color,box-shadow] [&>*:first-child]:rounded-s [&>*:last-child]:rounded-e focus-within:border-primary focus-within:divide-primary",
        classes,
        className,
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
  const classes = useClasses((c) => c.inputGroup.text.base);
  return (
    <Component
      data-name="input-group-text"
      className={twMerge(
        "flex items-center text-base py-1.5 px-3 font-normal text-center whitespace-nowrap",
        classes,
        className,
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
  const isTextarea = as === "textarea";
  const classes = useClasses((c) => c.inputGroup.formControl.base);
  return (
    <Component
      data-name="input-group-form-control"
      className={twMerge(
        "text-start flex-1 leading-10 text-base py-1.5 px-3 focus:outline-none bg-transparent border-0",
        isTextarea ? "min-h-30 field-sizing-content" : "h-10",
        classes,
        className,
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
