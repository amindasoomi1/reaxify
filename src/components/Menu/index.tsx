import {
  createContext,
  ElementType,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import {
  ChildrenProps,
  ComponentPropsWithAs,
  ToggleProps,
  TransitionClasses,
} from "../../types";
import { Portal } from "../Portal";

type Position = { left: number; top: number; right: number };
type MenuProps = ToggleProps & {
  anchorEl?: HTMLElement | null;
  closeOnClick?: boolean;
};
type MenuItemProps = {
  closeOnClick?: boolean;
};

type MenuContextType = {
  transitionState: TransitionStatus;
  closeOnClick: boolean;
} & ToggleProps;

const MenuContext = createContext<MenuContextType>({
  open: false,
  onClose: () => {},
  transitionState: "unmounted",
  closeOnClick: false,
});

function Menu<E extends ElementType = "div">({
  as,
  open,
  onClose,
  closeOnClick = false,
  anchorEl = null,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, MenuProps>) {
  const Component = as || "div";
  const offset = 16;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<Position>({
    left: offset,
    right: offset,
    top: offset,
  });

  const classes: TransitionClasses = {
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
      viewportWidth - menuWidth - offset
    );
    top = Math.min(Math.max(top, offset), viewportHeight - menuHeight - offset);

    setPosition({ left, right, top });
    setPositionProperty({ left, right, top });
  }, [open, anchorEl, setPosition, setPositionProperty]);

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
  return (
    <Portal>
      <Transition nodeRef={menuRef} in={open} timeout={300} unmountOnExit>
        {(state) => (
          <MenuContext.Provider
            value={{
              open,
              onClose,
              transitionState: state,
              closeOnClick,
            }}
          >
            <Container>
              <Backdrop />
              <Component
                ref={menuRef}
                className={twMerge(
                  "w-fit min-w-[12.5rem] bg-white shadow rounded p-2 transition-[scale,opacity] absolute top-[var(--top)] left-[var(--left)] right-auto origin-top-left rtl:left-auto rtl:right-[var(--right)] rtl:origin-top-right",
                  classes[state],
                  className
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
        "menu fixed inset-0 size-full flex flex-col bg-transparent transition-opacity overflow-hidden z-10",
        classes[transitionState]
      )}
    >
      {children}
    </div>
  );
}
function Backdrop() {
  const { onClose } = useContext(MenuContext);
  return (
    <button
      type="button"
      className="w-full flex-1 opacity-0 cursor-default lg:absolute lg:size-full lg:inset-0"
      onClick={onClose}
    ></button>
  );
}
function MenuItem<E extends ElementType = "button">({
  as,
  closeOnClick: itemCloseOnClick,
  type = "button",
  className,
  children,
  onClick,
  ...props
}: ComponentPropsWithAs<E, MenuItemProps>) {
  const Component = as || "div";
  const { closeOnClick: menuCloseOnClick, onClose } = useContext(MenuContext);
  const closeOnClick = itemCloseOnClick ?? menuCloseOnClick;
  const handleClick: typeof onClick = (e: MouseEvent<E>) => {
    closeOnClick && onClose?.();
    onClick?.(e);
  };
  return (
    <Component
      type={type}
      className={twMerge(
        "flex items-center px-3 py-2 w-full text-dark text-base font-normal rounded transition-colors hover:bg-dark hover:text-white",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
}

Menu.Item = MenuItem;

export default Menu;
