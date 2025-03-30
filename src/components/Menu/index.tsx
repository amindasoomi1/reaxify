import {
  ComponentProps,
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import { ChildrenProps, ToggleProps, TransitionClasses } from "../../types";
import { Portal } from "../Portal";

type BaseMenuProps = ToggleProps & {
  anchorEl?: HTMLElement | null;
  closeOnClick?: boolean;
};
type BaseMenuItemProps = ToggleProps & {
  anchorEl?: HTMLElement | null;
  closeOnClick?: boolean;
};
type MenuProps = BaseMenuProps &
  Omit<ComponentProps<"div">, keyof BaseMenuProps>;
type MenuItemProps = BaseMenuItemProps &
  Omit<ComponentProps<"button">, keyof BaseMenuItemProps>;
type MenuContextType = {
  transitionState: TransitionStatus;
  setParentRef: Dispatch<HTMLDivElement>;
  closeOnClick: boolean;
} & ToggleProps;

const MenuContext = createContext<MenuContextType>({
  open: false,
  onClose: () => {},
  transitionState: "unmounted",
  setParentRef: () => {},
  closeOnClick: false,
});

export function Menu({
  open,
  onClose,
  closeOnClick = false,
  anchorEl = null,
  className,
  children,
  ...props
}: MenuProps) {
  const offset = 16;
  const parentRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const yRef = useRef(offset);
  const XRef = useRef(offset);

  const classes: TransitionClasses = {
    entering: "scale-100 opacity-100",
    entered: "scale-100 opacity-100",
    exiting: "scale-90 opacity-0",
    exited: "scale-90 opacity-0",
    unmounted: "",
  };
  const setParentRef = useCallback((ref: HTMLDivElement) => {
    parentRef.current = ref;
  }, []);
  const setY = useCallback((value: number) => {
    parentRef.current?.style.setProperty("--y", `${value}px`);
  }, []);
  const setX = useCallback((value: number) => {
    parentRef.current?.style.setProperty("--x", `${value}px`);
  }, []);
  const yHandler = useCallback(() => {
    if (!open) return setY(yRef.current);
    if (!anchorEl) return setY(offset);
    if (!parentRef.current) return setY(offset);
    const anchorRect = anchorEl.getBoundingClientRect();
    const parentRect = parentRef.current.getBoundingClientRect();
    const anchorY = anchorRect.y;
    const anchorHeight = anchorRect.height;
    const parentHeight = parentRect.height;
    const rootHeight = document.body.clientHeight;
    const max = rootHeight - offset - parentHeight;
    const y = Math.min(anchorY + anchorHeight, max);
    yRef.current = y;
    setY(y);
  }, [open, anchorEl, setY]);
  const xHandler = useCallback(() => {
    if (!open) return setX(XRef.current);
    if (!anchorEl) return setX(offset);
    if (!parentRef.current) return setX(offset);
    const anchorRect = anchorEl.getBoundingClientRect();
    const parentRect = parentRef.current.getBoundingClientRect();
    const anchorX = anchorRect.x;
    const parentWidth = parentRect.width;
    const rootWidth = document.body.clientWidth;
    const max = rootWidth - offset - parentWidth;
    const x = Math.min(anchorX, max);
    XRef.current = x;
    setX(x);
  }, [open, anchorEl, setX]);
  useEffect(() => {
    xHandler();
    yHandler();
  }, [xHandler, yHandler, children]);
  useEffect(() => {
    const handleResize = () => {
      xHandler();
      yHandler();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [xHandler, yHandler]);
  return (
    <Portal>
      <Transition nodeRef={menuRef} in={open} timeout={300} unmountOnExit>
        {(state) => (
          <MenuContext.Provider
            value={{
              open,
              onClose,
              transitionState: state,
              setParentRef,
              closeOnClick,
            }}
          >
            <Container>
              <Backdrop />
              <Parent>
                <div
                  ref={menuRef}
                  className={twMerge(
                    "w-full min-w-[12.5rem] bg-white shadow rounded p-2 transition-[transform,opacity] origin-top-left rtl:origin-top-right",
                    classes[state],
                    className
                  )}
                  {...props}
                >
                  {children}
                </div>
              </Parent>
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
    entering: "active opacity-100 pointer-events-auto",
    entered: "active opacity-100 pointer-events-auto",
    exiting: "opacity-0 pointer-events-none",
    exited: "opacity-0 pointer-events-none",
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
function Parent({ children }: ChildrenProps) {
  const { setParentRef } = useContext(MenuContext);
  return (
    <div
      ref={setParentRef}
      className="w-fit max-w-full max-h-full absolute top-[var(--y)] start-[var(--x)]"
    >
      {children}
    </div>
  );
}
export function MenuItem({
  closeOnClick: itemCloseOnClick,
  type = "button",
  className,
  children,
  onClick,
  ...props
}: MenuItemProps) {
  const { closeOnClick: menuCloseOnClick, onClose } = useContext(MenuContext);
  const closeOnClick = itemCloseOnClick ?? menuCloseOnClick;
  const handleClick: Exclude<typeof onClick, undefined> = (e) => {
    closeOnClick && onClose?.();
    onClick?.(e);
  };
  return (
    <button
      type={type}
      className={twMerge(
        "flex items-center px-3 py-2 w-full text-dark text-base font-normal rounded transition-colors hover:bg-dark hover:text-white",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
