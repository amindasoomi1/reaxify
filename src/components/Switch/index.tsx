import { cn } from "@/helpers";
import { Color, ComponentPropsWithoutAs, Size } from "@/types";
import { ChangeEvent, Dispatch, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  checked?: boolean;
  onChange?: Dispatch<boolean>;
  disabled?: boolean;
  color?: Color;
  size?: Size;
  children?: never;
  inputProps?: ComponentPropsWithoutAs<
    "input",
    {
      type?: never;
      hidden?: never;
      className?: never;
      checked?: never;
      disabled?: never;
    }
  >;
};

export default function Switch({
  checked,
  onChange,
  disabled,
  color = "primary",
  size = "md",
  inputProps = {},
  className,
  ...props
}: ComponentPropsWithoutAs<"span", Props>) {
  const checkedClasses = useMemo(() => {
    return "";
  }, [checked]);
  const colorClasses = useMemo(() => {
    const colors = {
      primary: checked ? "bg-primary border-primary" : "bg-white border-border",
      secondary: checked
        ? "bg-secondary border-secondary"
        : "bg-white border-border",
      success: checked ? "bg-success border-success" : "bg-white border-border",
      info: checked ? "bg-info border-info" : "bg-white border-border",
      warning: checked ? "bg-warning border-warning" : "bg-white border-border",
      danger: checked ? "bg-danger border-danger" : "bg-white border-border",
      dark: checked ? "bg-dark border-dark" : "bg-white border-border",
      light: checked ? "bg-light border-light" : "bg-white border-border",
    };
    return colors?.[color];
  }, [color, checked]);
  const trackColorClasses = useMemo(() => {
    const colors = {
      primary: checked ? "bg-primary " : "bg-black",
      secondary: checked ? "bg-secondary" : "bg-black",
      success: checked ? "bg-success" : "bg-black",
      info: checked ? "bg-info" : "bg-black",
      warning: checked ? "bg-warning" : "bg-black",
      danger: checked ? "bg-danger" : "bg-black",
      dark: checked ? "bg-dark" : "bg-black",
      light: checked ? "bg-light" : "bg-black",
    };
    return colors?.[color];
  }, [color, checked]);
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: "[--size:0.25rem]",
      md: "[--size:0.5rem]",
      lg: "[--size:0.75rem]",
    };
    return sizes?.[size];
  }, [size]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.checked);
    inputProps.onChange?.(e);
  };
  return (
    <span
      data-name="switch"
      className={twMerge(
        sizeClasses,
        "[--w:2.5rem] [--h:1.875rem] [--t:0.75rem] [--width:calc(var(--w)+var(--size)*2)] [--height:calc(var(--h)+var(--size))] [--thumb:calc(var(--t)+var(--size))] [--scale:0] hover:[--scale:1]",
        "inline-flex w-(--width) h-(--height) overflow-hidden p-3 relative align-middle",
        disabled && "opacity-75",
        checkedClasses,
        className,
      )}
      {...props}
    >
      <input
        {...inputProps}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        data-name="switch-input"
        className="peer absolute inset-0 size-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-2"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      {/* <span className="inline-flex justify-center items-center size-(--height) rounded-full absolute inset-y-0 my-auto start-0 peer-checked:start-[calc(100%-var(--height))] transition-[inset-inline-start] z-[1]"> */}
      <span className="inline-flex justify-center items-center size-(--height) rounded-full absolute inset-y-0 my-auto left-0 peer-checked:left-[calc(100%-var(--height))] transition-[left] z-1">
        <span className="absolute size-full inset-0 bg-black/10 rounded-full scale-(--scale) transition-[scale]" />
        <span
          className={cn(
            "absolute size-(--thumb) inset-0 m-auto border rounded-full shadow transition-colors",
            colorClasses,
          )}
        />
      </span>
      <span
        className={cn(
          "size-full rounded-full opacity-35 transition-colors",
          trackColorClasses,
        )}
      />
    </span>
  );
}
