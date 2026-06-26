import { cn } from "@/helpers";
import { useClasses, usePreventableClose } from "@/hooks";
import {
  ComponentPropsWithAs,
  Size,
  ToggleEventProps,
  ToggleProps,
} from "@/types";
import { TransitionClasses } from "@/types/internal";

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
  transitionState: TransitionStatus;
  duration: number;
  preventClose: boolean;
  dismiss: VoidFunction;
} & ToggleProps;
type ModalProps = {
  size?: Size;
  duration?: number;
  preventClose?: boolean;
} & Partial<ToggleEventProps> &
  Partial<ToggleProps>;
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
  preventClose: false,
  dismiss: () => {},
});

function Modal<E extends ElementType = "div">({
  as,
  ref,
  size = "md",
  open = false,
  onClose = () => {},
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  duration = 300,
  preventClose = false,
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
  const dismiss = usePreventableClose({ preventClose, open, onClose });
  useImperativeHandle(ref, () => divRef.current);
  return (
    <Portal>
      <Transition
        nodeRef={divRef}
        in={open}
        timeout={duration}
        unmountOnExit
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        {(state) => (
          <Component
            ref={divRef}
            data-open={open}
            role="dialog"
            data-name="modal"
            style={{ transitionDuration: `${duration}ms` }}
            className={twMerge(
              "modal fixed size-full inset-0 flex flex-col z-10 bg-black/20 transition-opacity backdrop-blur p-4",
              classes,
              transitionClasses[state],
              className,
            )}
            {...props}
          >
            <div
              data-name="modal-backdrop"
              onClick={dismiss}
              className={cn(
                "absolute inset-0 cursor-default opacity-0",
                preventClose && "[&:active~*]:scale-95",
              )}
            />
            <ModalContext.Provider
              value={{
                size,
                open,
                onClose,
                dismiss,
                transitionState: state,
                duration,
                preventClose,
              }}
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
      data-name="modal-dialog"
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
  return (
    <Card.Header
      data-name="modal-header"
      className={cn(classes, className)}
      {...props}
    />
  );
}
function ModalBody({ className, ...props }: ModalBodyProps) {
  const classes = useClasses((c) => c.modal.body.base);
  return (
    <Card.Body
      data-name="modal-body"
      className={cn(classes, className)}
      {...props}
    />
  );
}
function ModalFooter({ className, ...props }: ModalFooterProps) {
  const classes = useClasses((c) => c.modal.footer.base);
  return (
    <Card.Footer
      data-name="modal-footer"
      className={cn(classes, className)}
      {...props}
    />
  );
}

Modal.Dialog = ModalDialog;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
