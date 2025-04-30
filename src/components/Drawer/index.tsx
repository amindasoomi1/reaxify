import { useClasses } from "@/hooks";
import { ComponentPropsWithAs, ToggleProps } from "@/types";
import { TransitionClasses } from "@/types/internal";
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
  onClose: VoidFunction;
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
type AnchorClasses<T = string | undefined> = { [key in Anchor]: T };

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
  return (
    <Portal>
      <Transition nodeRef={divRef} in={open} timeout={duration} unmountOnExit>
        {(state) => (
          <Component
            ref={divRef}
            style={{ transitionDuration: `${duration}ms` }}
            data-open={open}
            className={twMerge(
              "fixed size-full inset-0 flex z-10 bg-black/20 backdrop-blur transition-opacity [--drawer-ratio:1] rtl:[--drawer-ratio:-1]",
              classes?.base,
              transitionClasses[state],
              anchorClasses,
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
  const classes = useClasses((c) => c.drawer.menu);
  const { anchor, duration, transitionState } = useContext(DrawerContext);
  const anchorClasses = useMemo(() => {
    const result: AnchorClasses = {
      start: "w-[31.875rem] h-full max-w-[97.5%] rounded-e",
      end: "w-[31.875rem] h-full max-w-[97.5%] rounded-s",
      top: "w-full h-[31.875rem] max-h-[97.5%] rounded-b",
      bottom: "w-full h-[31.875rem] max-h-[97.5%] rounded-t",
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
        classes?.base,
        transitionClasses[transitionState],
        anchorClasses,
        className
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
