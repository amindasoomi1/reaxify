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
import { cn } from "../../helpers";
import Card from "../Card";
import Portal from "../Portal";

type Anchor = "start" | "end" | "top" | "bottom";
type Context = {
  open: boolean;
  onClose: Callback;
  duration: number;
  anchor: Anchor;
  transitionState: TransitionStatus;
};
type DrawerBaseProps = {
  anchor?: Anchor;
  duration?: number;
} & ToggleProps;
type DrawerProps<E extends ElementType> = ComponentPropsWithAs<
  E,
  DrawerBaseProps
>;
type DrawerMenuProps = Omit<ComponentProps<"div">, "as" | "ref">;
type DrawerHeaderProps = ComponentProps<"div">;
type DrawerBodyProps = ComponentProps<"div">;
type DrawerFooterProps = ComponentProps<"div">;
type AnchorClasses<T = string> = { [key in Anchor]: T };

export const DrawerContext = createContext<Context>({
  open: false,
  onClose: () => {},
  duration: 300,
  anchor: "start",
  transitionState: "unmounted",
});

function Drawer<E extends ElementType = "div">({
  as,
  open = false,
  onClose = () => {},
  duration = 300,
  anchor = "end",
  className = "",
  children,
  ...props
}: DrawerProps<E>) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const Component = as || "div";
  const transitionClasses: TransitionClasses = {
    entering: "active opacity-100 pointer-events-auto",
    entered: "active opacity-100 pointer-events-auto",
    exiting: "opacity-0 pointer-events-none",
    exited: "opacity-0 pointer-events-none",
    unmounted: "",
  };
  const flexClasses = useMemo(() => {
    const classes: AnchorClasses = {
      start: "flex-row-reverse",
      end: "flex-row",
      top: "flex-col-reverse",
      bottom: "flex-col",
    };
    return classes[anchor];
  }, [anchor]);
  return (
    <Portal>
      <Transition nodeRef={divRef} in={open} timeout={duration} unmountOnExit>
        {(state) => (
          <Component
            ref={divRef}
            style={{ transitionDuration: `${duration}ms` }}
            className={twMerge(
              "drawer fixed size-full inset-0 flex z-10 bg-black/20 backdrop-blur transition-opacity [--drawer-ratio:1] rtl:[--drawer-ratio:-1]",
              transitionClasses[state],
              flexClasses,
              className
            )}
            {...props}
          >
            <button
              type="button"
              onClick={() => onClose()}
              className="h-full flex-1 opacity-0 cursor-default min-w-[5%]"
            />
            <DrawerContext.Provider
              value={{
                open,
                onClose,
                transitionState: state,
                duration,
                anchor,
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
  const { anchor, duration, transitionState } = useContext(DrawerContext);
  const sizeClasses = useMemo(() => {
    const classes: AnchorClasses = {
      start: "w-[30rem] h-full max-w-[97.5%]",
      end: "w-[30rem] h-full max-w-[97.5%]",
      top: "w-full h-[30rem] max-h-[97.5%]",
      bottom: "w-full h-[30rem] max-h-[97.5%]",
    };
    return classes[anchor];
  }, [anchor]);
  const roundedClasses = useMemo(() => {
    const classes: AnchorClasses = {
      start: "rounded-e",
      end: "rounded-s",
      top: "rounded-b",
      bottom: "rounded-t",
    };
    return classes[anchor];
  }, [anchor]);
  const transitionClasses = useMemo(() => {
    const classes: AnchorClasses<TransitionClasses> = {
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
    return classes[anchor];
  }, [anchor]);
  return (
    <Card
      as="div"
      style={{ transitionDuration: `${duration}ms` }}
      className={twMerge(
        "relative flex flex-col transition-[translate,width] rounded-none",
        sizeClasses,
        transitionClasses[transitionState],
        roundedClasses,
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
function DrawerHeader(props: DrawerHeaderProps) {
  return <Card.Header {...props} />;
}
function DrawerBody({ className, ...props }: DrawerBodyProps) {
  return (
    <Card.Body className={cn("flex-1 overflow-auto", className)} {...props} />
  );
}
function DrawerFooter(props: DrawerFooterProps) {
  return <Card.Footer {...props} />;
}

Drawer.Menu = DrawerMenu;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export default Drawer;
