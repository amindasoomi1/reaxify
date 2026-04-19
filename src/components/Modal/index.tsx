import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs, Size, ToggleProps } from "@/types";
import { TransitionClasses } from "@/types/internal";

import { useHotkey } from "@tanstack/react-hotkeys";
import {
  ComponentProps,
  createContext,
  ElementType,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import Card from "../Card";
import Portal from "../Portal";

type Context = {
  size: Size;
  open: boolean;
  onClose: VoidFunction;
  transitionState: TransitionStatus;
  duration: number;
};
type ModalProps = { size?: Size; duration?: number } & Partial<ToggleProps>;
type ModalDialogProps = Omit<ComponentProps<"div">, "as" | "ref">;
type ModalHeaderProps = ComponentProps<"div">;
type ModalBodyProps = ComponentProps<"div">;
type ModalFooterProps = ComponentProps<"div">;

export const ModalContext = createContext<Context>({
  size: "md",
  open: false,
  onClose: () => {},
  transitionState: "unmounted",
  duration: 300,
});

function Modal<E extends ElementType = "div">({
  as,
  ref,
  size = "md",
  open = false,
  onClose = () => {},
  duration = 300,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, ModalProps>) {
  const classes = useClasses((c) => c.modal.base);
  const divRef = useRef<HTMLDivElement | null>(null);
  const Component = as || "div";
  const transitionClasses: TransitionClasses = {
    entering: "active opacity-100 pointer-events-auto",
    entered: "active opacity-100 pointer-events-auto",
    exiting: "opacity-0 pointer-events-none",
    exited: "opacity-0 pointer-events-none",
    unmounted: "",
  };
  useImperativeHandle(ref, () => divRef.current);
  useHotkey("Escape", () => onClose(), { enabled: open });
  return (
    <Portal>
      <Transition nodeRef={divRef} in={open} timeout={duration} unmountOnExit>
        {(state) => (
          <Component
            ref={divRef}
            data-open={open}
            style={{ transitionDuration: `${duration}ms` }}
            className={twMerge(
              "modal fixed size-full inset-0 flex flex-col z-10 bg-black/20 transition-opacity backdrop-blur p-4",
              classes,
              transitionClasses[state],
              className,
            )}
            {...props}
          >
            <button
              type="button"
              onClick={() => onClose()}
              className="absolute inset-0 cursor-default opacity-0"
            />
            <ModalContext.Provider
              value={{ size, open, onClose, transitionState: state, duration }}
            >
              {children}
            </ModalContext.Provider>
          </Component>
        )}
      </Transition>
    </Portal>
  );
}
function ModalDialog({ className, children, ...props }: ModalDialogProps) {
  const classes = useClasses((c) => c.modal.dialog);
  const { size, transitionState, duration } = useContext(ModalContext);
  const transitionClasses: TransitionClasses = {
    entering: "scale-100",
    entered: "scale-100",
    exiting: "scale-75",
    exited: "scale-75",
    unmounted: "",
  };
  const modalSize = useMemo(() => {
    const sizes = {
      sm: "min-[576px]:w-[300px]",
      md: "min-[576px]:w-[500px]",
      lg: "min-[992px]:w-[800px]",
    };
    return [sizes[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  return (
    <Card
      as="div"
      style={{ transitionDuration: `${duration}ms` }}
      className={twMerge(
        "max-w-full max-h-full m-auto transition-transform",
        classes?.base,
        modalSize,
        transitionClasses[transitionState],
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
function ModalHeader({ className, ...props }: ModalHeaderProps) {
  const classes = useClasses((c) => c.modal.header.base);
  return <Card.Header className={cn(classes, className)} {...props} />;
}
function ModalBody({ className, ...props }: ModalBodyProps) {
  const classes = useClasses((c) => c.modal.body.base);
  return <Card.Body className={cn(classes, className)} {...props} />;
}
function ModalFooter({ className, ...props }: ModalFooterProps) {
  const classes = useClasses((c) => c.modal.footer.base);
  return <Card.Footer className={cn(classes, className)} {...props} />;
}

Modal.Dialog = ModalDialog;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
