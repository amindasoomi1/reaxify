import {
  Callback,
  ComponentPropsWithAs,
  ToggleProps,
  TransitionClasses,
} from "@/types";
import {
  ComponentProps,
  createContext,
  ElementType,
  useContext,
  useMemo,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import Card from "../Card";
import Portal from "../Portal";

type Size = "sm" | "md" | "lg";
type Context = {
  size: Size;
  open: boolean;
  onClose: Callback;
  transitionState: TransitionStatus;
  duration: number;
};
type ModalProps = { size?: Size; duration?: number } & ToggleProps;
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
  size = "md",
  open = false,
  onClose = () => {},
  duration = 300,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, ModalProps>) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const Component = as || "div";
  const transitionClasses: TransitionClasses = {
    entering: "active opacity-100 pointer-events-auto",
    entered: "active opacity-100 pointer-events-auto",
    exiting: "opacity-0 pointer-events-none",
    exited: "opacity-0 pointer-events-none",
    unmounted: "",
  };
  return (
    <Portal>
      <Transition nodeRef={divRef} in={open} timeout={duration} unmountOnExit>
        {(state) => (
          <Component
            ref={divRef}
            style={{ transitionDuration: `${duration}ms` }}
            className={twMerge(
              "modal fixed size-full inset-0 flex flex-col z-10 bg-black/20 transition-opacity backdrop-blur p-4",
              transitionClasses[state],
              className
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
  const { size, transitionState, duration } = useContext(ModalContext);
  const transitionClasses: TransitionClasses = {
    entering: "scale-100",
    entered: "scale-100",
    exiting: "scale-75",
    exited: "scale-75",
    unmounted: "",
  };
  const modalSize = useMemo(() => {
    if (size === "sm") return "min-[576px]:w-[300px]";
    if (size === "lg") return "min-[992px]:w-[800px]";
    //   if (size === "xl")
    //     return "min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]";
    return "min-[576px]:w-[500px]";
  }, [size]);
  return (
    <Card
      as="div"
      style={{ transitionDuration: `${duration}ms` }}
      className={twMerge(
        "max-w-full max-h-full m-auto transition-transform",
        modalSize,
        transitionClasses[transitionState],
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
function ModalHeader(props: ModalHeaderProps) {
  return <Card.Header {...props} />;
}
function ModalBody(props: ModalBodyProps) {
  return <Card.Body {...props} />;
}
function ModalFooter(props: ModalFooterProps) {
  return <Card.Footer {...props} />;
}

Modal.Dialog = ModalDialog;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
