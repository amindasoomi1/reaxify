import { ComponentProps, FormEvent, createContext, useRef } from "react";

type FormProps = ComponentProps<"form"> & { disabled?: boolean };
type Callback = () => boolean;
type FormControls = { [key: string]: Callback };
type FormContextType = {
  setFormControl?: (key: string, callback: Callback) => void;
  removeFormControl?: (key: string) => void;
  formDisabled?: boolean;
};

export const FormContext = createContext<FormContextType>({});

export default function Form({
  disabled = false,
  onSubmit,
  onError,
  children,
  ...props
}: FormProps) {
  const formControlsRef = useRef<FormControls>({});
  const setFormControl = (key: string, callback: Callback) => {
    formControlsRef.current[key] = callback;
  };
  const removeFormControl = (key: string) => {
    delete formControlsRef.current[key];
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = [...e.currentTarget.querySelectorAll("[id]")];
    const result = fields.map((e) => {
      const id = e.id || null;
      if (!id) return { element: e, valid: true };
      const callback = formControlsRef.current[id];
      const valid = callback?.();
      return { element: e, valid };
    });
    const canSubmit = result.every((e) => Boolean(e.valid));
    if (canSubmit) return onSubmit?.(e);
    const errorElement = result.find((e) => !e.valid)?.element;
    // eslint-disable-next-line
    // @ts-expect-error
    errorElement?.select?.();
    errorElement?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    onError?.(e);
  };
  return (
    <form {...props} onSubmit={handleSubmit}>
      <FormContext.Provider
        value={{ setFormControl, removeFormControl, formDisabled: disabled }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
}
