import { Rules } from "@/types";
import {
  ComponentProps,
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { cn, randomID } from "../..//helpers";
import { FormContext } from "../Form";
import Stack from "../Stack";
import Typography from "../Typography";

type Size = "sm" | "md" | "lg";
type InputGroupBaseProps = {
  value?: string | null;
  setValue?: Dispatch<string | null>;
  rules?: null | Rules;
  size?: Size;
};
type FormControlBaseProps = {
  multiline?: boolean;
  rows?: number;
  //   minRows?: number;
  //   maxRows?: number;
};
type HelperTextBaseProps = {
  as?: never;
  children?: never;
};
type Context = {
  value: string | null;
  setValue: Dispatch<string | null>;
  rules: null | Rules;
  helperText: string;
  error: boolean;
  size: Size;
};
type InputGroupProps = InputGroupBaseProps &
  Omit<ComponentProps<"div">, keyof InputGroupBaseProps>;
type InputGroupLabelProps = Omit<
  ComponentProps<typeof Typography<"label">>,
  "as"
>;
type InputGroupStackProps = Omit<ComponentProps<typeof Stack<"div">>, "as">;
type InputGroupTextProps = ComponentProps<"span">;
type FormControlProps = FormControlBaseProps &
  Omit<ComponentProps<"input">, keyof FormControlBaseProps>;
type HelperTextProps = HelperTextBaseProps &
  Omit<ComponentProps<typeof Typography<"p">>, keyof HelperTextBaseProps>;
type Sizes = {
  [key in Size]?: string;
};
const InputGroupContext = createContext<Context>({
  value: null,
  setValue: () => {},
  rules: null,
  helperText: "",
  error: false,
  size: "md",
});

export function InputGroup({
  id,
  value = null,
  setValue = () => {},
  rules = null,
  size = "md",
  className,
  children,
  ...props
}: InputGroupProps) {
  const { setFormControl, removeFormControl } = useContext(FormContext);
  const inputGroupRef = useRef<HTMLDivElement>(null);
  const ID = useMemo(() => id ?? randomID(), [id]);
  //   const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const error = !!helperText.length;
  const rulesHandler = useCallback(() => {
    if (!rules?.length) return true;
    return rules.every((rule) => {
      const element = inputGroupRef.current;
      if (!element) return true;
      const input = element.querySelector("input");
      const textarea = element.querySelector("textarea");
      const value = input?.value || textarea?.value || "";
      const result = rule(value);
      const isValid = result === true;
      setHelperText(isValid ? "" : result);
      return isValid;
    });
  }, [rules]);
  useEffect(() => {
    const callback = () => {
      const isValid = rulesHandler();
      return isValid;
    };
    setFormControl?.(ID, callback);
    return () => {
      removeFormControl?.(ID);
    };
  }, [value, rules, ID, rulesHandler, setFormControl, removeFormControl]);

  return (
    <div
      id={ID}
      ref={inputGroupRef}
      className={twMerge("w-full", className)}
      {...props}
    >
      <InputGroupContext.Provider
        value={{ value, setValue, rules, helperText, error, size }}
      >
        {children}
      </InputGroupContext.Provider>
    </div>
  );
}

export function InputGroupLabel({
  variant = "body-2",
  className,
  children,
  ...props
}: InputGroupLabelProps) {
  const { size } = useContext(InputGroupContext);
  const sizeClasses = useMemo(() => {
    const sizes: Sizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
    return sizes?.[size];
  }, [size]);
  return (
    <Typography
      as="label"
      variant={variant}
      className={cn("text-start mb-0.5 px-0.5", sizeClasses, className)}
      {...props}
    >
      {children}
    </Typography>
  );
}
export function InputGroupStack({
  className,
  children,
  ...props
}: InputGroupStackProps) {
  const { error } = useContext(InputGroupContext);
  return (
    <Stack
      className={cn(
        "border rounded divide-x transition-[border-color,box-shadow] [&>*:first-child]:rounded-s [&>*:last-child]:rounded-e focus-within:border-primary focus-within:divide-primary",
        error &&
          "border-danger focus-within:ring-[1px] focus-within:ring-danger focus-within:border-danger focus-within:divide-danger",
        className
      )}
      {...props}
    >
      {children}
    </Stack>
  );
}
export function InputGroupText({
  className,
  children,
  ...props
}: InputGroupTextProps) {
  const { size } = useContext(InputGroupContext);
  const sizeClasses = useMemo(() => {
    const sizes: Sizes = {
      sm: "text-sm py-1 px-2",
      md: "text-base py-1.5 px-3",
      lg: "text-lg py-2 px-4",
    };
    return sizes?.[size];
  }, [size]);
  return (
    <span
      className={twMerge(
        "flex items-center text-base font-normal text-center whitespace-nowrap",
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
export function FormControl({
  multiline = false,
  rows = 4,
  value: inputValue,
  onChange,
  className,
  ...props
}: FormControlProps) {
  const Component = multiline ? "textarea" : "input";
  const isInput = Component === "input";
  const isTextarea = Component === "textarea";
  const { value, setValue, size } = useContext(InputGroupContext);
  const handleRows = useMemo(() => {
    if (!isTextarea) return undefined;
    return rows;
  }, [isTextarea, rows]);
  const sizeClasses = useMemo(() => {
    const sizes: Sizes = {
      sm: cn("leading-8 text-sm py-1 px-2", isInput && "h-8"),
      md: cn("leading-10 text-base py-1.5 px-3", isInput && "h-10"),
      lg: cn("leading-[3rem] text-lg py-2 px-4", isInput && "h-12"),
    };
    return sizes?.[size];
  }, [size, isInput]);
  const handleChange: Exclude<typeof onChange, undefined> = (e) => {
    setValue(e.target.value || null);
    onChange?.(e);
  };
  return (
    <Component
      /* eslint-disable @typescript-eslint/no-explicit-any */
      value={value ?? inputValue ?? undefined}
      onChange={handleChange as any}
      className={twMerge(
        "text-start flex-1 focus:outline-none bg-transparent border-0 resize-none",
        sizeClasses,
        className
      )}
      rows={handleRows}
      {...(props as any)}
    />
  );
}
export function HelperText({ className, ...props }: HelperTextProps) {
  const { helperText } = useContext(InputGroupContext);
  if (!helperText) return null;
  return (
    <Typography
      as="p"
      className={twMerge(
        "text-start text-xs font-normal px-0.5 mt-px text-danger",
        className
      )}
      {...props}
    >
      {helperText}
    </Typography>
  );
}
