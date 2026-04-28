import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { ChildrenProps, ComponentPropsWithAs, ToggleProps } from "@/types";
import { TransitionClasses } from "@/types/internal";
import { useHotkey } from "@tanstack/react-hotkeys";
import {
  createContext,
  ElementType,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import Portal from "../Portal";

type Position = { left: number; top: number; right: number };
type MenuProps = {
  anchorEl?: HTMLElement | null;
  closeOnClick?: boolean;
  preventClose?: boolean;
} & ToggleProps;
type MenuItemProps = {
  closeOnClick?: boolean;
};

type MenuContextType = {
  transitionState: TransitionStatus;
  closeOnClick: boolean;
  preventClose: boolean;
} & Partial<ToggleProps>;

const MenuContext = createContext<MenuContextType>({
  open: false,
  onClose: () => {},
  transitionState: "unmounted",
  closeOnClick: false,
  preventClose: false,
});

function Menu<E extends ElementType = "ul">({
  as,
  ref,
  open,
  onClose,
  closeOnClick = false,
  preventClose = false,
  anchorEl = null,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, MenuProps>) {
  const classes = useClasses((c) => c.menu.base);
  const Component = as || "ul";
  const offset = 16;
  const menuRef = useRef<HTMLUListElement | null>(null);
  const positionRef = useRef<Position>({
    left: offset,
    right: offset,
    top: offset,
  });

  const transitionClasses: TransitionClasses = {
    entering: "scale-100 opacity-100",
    entered: "scale-100 opacity-100",
    exiting: "scale-90 opacity-0",
    exited: "scale-90 opacity-0",
    unmounted: "",
  };

  const setPosition = useCallback((position: Position) => {
    positionRef.current = position;
  }, []);
  const setPositionProperty = useCallback((position: Position) => {
    menuRef.current?.style.setProperty("--left", `${position.left}px`);
    menuRef.current?.style.setProperty("--right", `${position.right}px`);
    menuRef.current?.style.setProperty("--top", `${position.top}px`);
  }, []);
  const positionHandler = useCallback(() => {
    if (!open) return;
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const menuWidth = menuRef.current?.offsetWidth || 150;
    const menuHeight = menuRef.current?.offsetHeight || 200;

    let left = rect.left;
    let right = rect.right;
    let top = rect.bottom;

    left = Math.min(Math.max(left, offset), viewportWidth - menuWidth - offset);
    right = Math.min(
      Math.max(viewportWidth - rect.right, offset),
      viewportWidth - menuWidth - offset,
    );
    top = Math.min(Math.max(top, offset), viewportHeight - menuHeight - offset);

    setPosition({ left, right, top });
    setPositionProperty({ left, right, top });
  }, [open, anchorEl, setPosition, setPositionProperty]);
  const handleCLose = () => {
    if (preventClose) return;
    onClose?.();
  };

  useEffect(() => {
    positionHandler();
  }, [positionHandler, children]);
  useEffect(() => {
    const handleResize = () => {
      positionHandler();
    };
    window.addEventListener("scroll", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [positionHandler]);
  useImperativeHandle(ref, () => menuRef.current);
  useHotkey("Escape", () => onClose(), {
    conflictBehavior: "allow",
    ignoreInputs: true,
    enabled: open && !preventClose,
  });
  return (
    <Portal>
      <Transition nodeRef={menuRef} in={open} timeout={300} unmountOnExit>
        {(state) => (
          <MenuContext.Provider
            value={{
              open,
              onClose: handleCLose,
              transitionState: state,
              closeOnClick,
              preventClose,
            }}
          >
            <Container>
              <Backdrop />
              <Component
                ref={menuRef}
                autoFocus
                data-open={open}
                role="menu"
                className={twMerge(
                  "w-fit min-w-52 bg-white shadow-lg rounded py-2 transition-[scale,opacity] absolute top-(--top) left-(--left) right-auto origin-top-left rtl:left-auto rtl:right-(--right) rtl:origin-top-right",
                  classes,
                  transitionClasses[state],
                  className,
                )}
                {...props}
              >
                {children}
              </Component>
            </Container>
          </MenuContext.Provider>
        )}
      </Transition>
    </Portal>
  );
}
function Container({ children }: ChildrenProps) {
  const { transitionState } = useContext(MenuContext);
  const classes: TransitionClasses = {
    entering: "active pointer-events-auto",
    entered: "active pointer-events-auto",
    exiting: "pointer-events-none",
    exited: "pointer-events-none",
    unmounted: "",
  };
  return (
    <div
      className={twMerge(
        "fixed inset-0 size-full flex flex-col bg-transparent transition-opacity overflow-hidden z-10",
        classes[transitionState],
      )}
    >
      {children}
    </div>
  );
}
function Backdrop() {
  const { onClose, preventClose } = useContext(MenuContext);
  return (
    <div
      className={cn(
        "w-full flex-1 opacity-0 cursor-default lg:absolute lg:size-full lg:inset-0",
        preventClose && "[&:active~*]:scale-95",
      )}
      onClick={onClose}
    ></div>
  );
}
function MenuItem<E extends ElementType = "button">({
  as,
  closeOnClick: itemCloseOnClick,
  className,
  children,
  onClick,
  ...props
}: ComponentPropsWithAs<E, MenuItemProps>) {
  const classes = useClasses((c) => c.menu.item.base);
  const { closeOnClick: menuCloseOnClick, onClose } = useContext(MenuContext);
  const closeOnClick = itemCloseOnClick ?? menuCloseOnClick;
  const handleClick = (e: MouseEvent<E>) => {
    closeOnClick && onClose?.();
    onClick?.(e);
  };
  return (
    <Button
      as={(as as ElementType) ?? "li"}
      color="light"
      variant="text"
      role="menuitem"
      className={twMerge(
        "w-full flex items-center justify-start align-middle px-4 py-1.5 bg-transparent text-base font-normal rounded-none whitespace-nowrap transition-colors hover:bg-dark/5",
        classes,
        className,
      )}
      onClick={handleClick as typeof onClick}
      {...props}
    >
      {children}
    </Button>
  );
}

Menu.Item = MenuItem;

export default Menu;
