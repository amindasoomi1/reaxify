import { asComponent, cn } from "@/helpers";
import { useClasses, usePreventableClose } from "@/hooks";
import { ComponentPropsWithAs, ToggleEventProps, ToggleProps } from "@/types";
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

type Anchor = "start" | "end" | "top" | "bottom";
type Context = {
  duration: number;
  anchor: Anchor;
  transitionState: TransitionStatus;
  preventClose: boolean;
  dismiss: VoidFunction;
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
type AnchorClasses<T = string | undefined> = { [key in Anchor]: T };

export const DrawerContext = createContext<Context>({
  open: false,
  onClose: () => {},
  duration: 300,
  anchor: "start",
  transitionState: "unmounted",
  preventClose: false,
  dismiss: () => {},
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
  const dismiss = usePreventableClose({ preventClose, open, onClose });
  useImperativeHandle(ref, () => divRef.current);
  const Component = asComponent(as, "div");
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
            data-name="drawer"
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
              data-name="drawer-backdrop"
              onClick={dismiss}
              className={cn(
                "absolute inset-0 size-full cursor-default opacity-0",
                preventClose && "[&:active~*]:scale-95",
              )}
            />
            <DrawerContext.Provider
              value={{
                open,
                onClose,
                dismiss,
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
function DrawerMenu<E extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: ComponentPropsWithAs<E>) {
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
      as={as}
      data-name="drawer-menu"
      style={{ transitionDuration: `${duration}ms` }}
      className={twMerge(
        "relative flex flex-col transition-[translate,width] rounded-none",
        preventClose && "transition-transform",
        classes?.base,
        transitionClasses[transitionState],
        anchorClasses,
        className,
      )}
      {...(props as ComponentProps<E>)}
    >
      {children}
    </Card>
  );
}
function DrawerHeader<E extends ElementType = "div">({
  as,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.drawer.header.base);
  return (
    <Card.Header
      as={as}
      data-name="drawer-header"
      className={cn(classes, className)}
      {...(props as ComponentProps<E>)}
    />
  );
}
function DrawerBody<E extends ElementType = "div">({
  as,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.drawer.body.base);
  return (
    <Card.Body
      as={as}
      data-name="drawer-body"
      className={cn("flex-1 overflow-auto", classes, className)}
      {...(props as ComponentProps<E>)}
    />
  );
}
function DrawerFooter<E extends ElementType = "div">({
  as,
  className,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.drawer.footer.base);
  return (
    <Card.Footer
      as={as}
      data-name="drawer-footer"
      className={cn(classes, className)}
      {...(props as ComponentProps<E>)}
    />
  );
}

Drawer.Menu = DrawerMenu;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export default Drawer;
