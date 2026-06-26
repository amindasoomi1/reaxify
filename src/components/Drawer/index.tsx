import { useClasses } from "@/hooks";
import { ComponentPropsWithAs, ToggleEventProps, ToggleProps } from "@/types";
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
import { cn } from "../../helpers";
import Card from "../Card";
import Portal from "../Portal";

type Anchor = "start" | "end" | "top" | "bottom";
type Context = {
  duration: number;
  anchor: Anchor;
  transitionState: TransitionStatus;
  preventClose: boolean;
} & ToggleProps;
type DrawerBaseProps = {
  anchor?: Anchor;
  duration?: number;
  preventClose?: boolean;
} & Partial<ToggleEventProps> &
  Partial<ToggleProps>;
type DrawerProps<E extends ElementType> = ComponentPropsWithAs<
  E,
  DrawerBaseProps
>;
type DrawerMenuProps = Omit<ComponentProps<"div">, "as" | "ref">;
type DrawerHeaderProps = ComponentProps<"div">;
type DrawerBodyProps = ComponentProps<"div">;
type DrawerFooterProps = ComponentProps<"div">;
type AnchorClasses<T = string | undefined> = { [key in Anchor]: T };

export const DrawerContext = createContext<Context>({
  open: false,
  onClose: () => {},
  duration: 300,
  anchor: "start",
  transitionState: "unmounted",
  preventClose: false,
});

function Drawer<E extends ElementType = "div">({
  as,
  ref,
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
  anchor = "end",
  className = "",
  children,
  ...props
}: DrawerProps<E>) {
  const classes = useClasses((c) => c.drawer);
  const divRef = useRef<HTMLDivElement | null>(null);
  const Component = as || "div";
  const transitionClasses: TransitionClasses = {
    entering: "active opacity-100 pointer-events-auto",
    entered: "active opacity-100 pointer-events-auto",
    exiting: "opacity-0 pointer-events-none",
    exited: "opacity-0 pointer-events-none",
    unmounted: "",
  };
  const anchorClasses = useMemo(() => {
    const result: AnchorClasses = {
      start: "flex-row-reverse",
      end: "flex-row",
      top: "flex-col-reverse",
      bottom: "flex-col",
    };
    const classesResult = classes?.anchor?.[anchor];
    const anchorResult = result[anchor];
    return [anchorResult, classesResult];
  }, [anchor, classes?.anchor]);
  const handleClose = () => {
    if (preventClose) return;
    onClose();
  };
  useImperativeHandle(ref, () => divRef.current);
  useHotkey("Escape", () => onClose(), {
    conflictBehavior: "allow",
    ignoreInputs: true,
    enabled: open && !preventClose,
  });
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
            style={{ transitionDuration: `${duration}ms` }}
            role="dialog"
            data-open={open}
            className={twMerge(
              "fixed size-full inset-0 flex z-10 bg-black/20 backdrop-blur transition-opacity [--drawer-ratio:1] rtl:[--drawer-ratio:-1]",
              classes?.base,
              transitionClasses[state],
              anchorClasses,
              className,
            )}
            {...props}
          >
            <div
              onClick={handleClose}
              className={cn(
                "absolute inset-0 size-full cursor-default opacity-0",
                preventClose && "[&:active~*]:scale-95",
              )}
            />
            <DrawerContext.Provider
              value={{
                open,
                onClose: handleClose,
                transitionState: state,
                duration,
                anchor,
                preventClose,
              }}
            >
              {children}
            </DrawerContext.Provider>
          </Component>
        )}
      </Transition>
    </Portal>
  );
}
function DrawerMenu({ children, className = "", ...props }: DrawerMenuProps) {
  const classes = useClasses((c) => c.drawer.menu);
  const { anchor, duration, transitionState, preventClose } =
    useContext(DrawerContext);
  const anchorClasses = useMemo(() => {
    const result: AnchorClasses = {
      start: "w-[31.875rem] h-full max-w-[92.5%] rounded-e me-auto",
      end: "w-[31.875rem] h-full max-w-[92.5%] rounded-s ms-auto",
      top: "w-full max-h-[92.5%] rounded-b mb-auto",
      bottom: "w-full max-h-[92.5%] rounded-t mt-auto",
    };
    const classesResult = classes?.anchor?.[anchor];
    return [result[anchor], classesResult];
  }, [anchor, classes?.anchor]);
  const transitionClasses = useMemo(() => {
    const result: AnchorClasses<TransitionClasses> = {
      start: {
        entering: "translate-x-0",
        entered: "translate-x-0",
        exiting: "-translate-x-[calc(100%*var(--drawer-ratio))]",
        exited: "-translate-x-[calc(100%*var(--drawer-ratio))]",
        unmounted: "",
      },
      end: {
        entering: "translate-x-0",
        entered: "translate-x-0",
        exiting: "translate-x-[calc(100%*var(--drawer-ratio))]",
        exited: "translate-x-[calc(100%*var(--drawer-ratio))]",
        unmounted: "",
      },
      top: {
        entering: "translate-y-0",
        entered: "translate-y-0",
        exiting: "-translate-y-full",
        exited: "-translate-y-full",
        unmounted: "",
      },
      bottom: {
        entering: "translate-y-0",
        entered: "translate-y-0",
        exiting: "translate-y-full",
        exited: "translate-y-full",
        unmounted: "",
      },
    };
    return result[anchor];
  }, [anchor]);
  return (
    <Card
      as="div"
      style={{ transitionDuration: `${duration}ms` }}
      className={twMerge(
        "relative flex flex-col transition-[translate,width] rounded-none",
        preventClose && "transition-transform",
        classes?.base,
        transitionClasses[transitionState],
        anchorClasses,
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  const classes = useClasses((c) => c.drawer.header.base);
  return <Card.Header className={cn(classes, className)} {...props} />;
}
function DrawerBody({ className, ...props }: DrawerBodyProps) {
  const classes = useClasses((c) => c.drawer.body.base);
  return (
    <Card.Body
      className={cn("flex-1 overflow-auto", classes, className)}
      {...props}
    />
  );
}
function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  const classes = useClasses((c) => c.drawer.footer.base);
  return <Card.Footer className={cn(classes, className)} {...props} />;
}

Drawer.Menu = DrawerMenu;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export default Drawer;
