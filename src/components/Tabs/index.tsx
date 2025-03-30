import { ChildrenProps } from "@/types";
import {
  ComponentProps,
  createContext,
  Dispatch,
  Fragment,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "../../helpers";
import { useDebounce } from "../../hooks";
import Button from "../Button";

type TabsProps = {
  active?: null | string;
  onChange?: Dispatch<string>;
} & ChildrenProps;
type TabButtonProps = { eventKey: string; type?: never; ref?: never };
type TabItemProps = { eventKey: string } & ChildrenProps;
type TabsContextType = {
  active: null | string;
  onChange: Dispatch<string>;
  buttonGroupClasses: string;
};

export const TabsContext = createContext<TabsContextType>({
  active: null,
  onChange: () => {},
  buttonGroupClasses: "",
});

export function Tabs({
  active = null,
  onChange = () => {},
  children,
}: TabsProps) {
  const buttonGroupClasses = "relative flex items-center";
  return (
    <TabsContext.Provider value={{ active, onChange, buttonGroupClasses }}>
      {children}
    </TabsContext.Provider>
  );
}
export function TabIndicator({
  className,
  ...props
}: Omit<ComponentProps<"span">, "children">) {
  const { active } = useContext(TabsContext);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const debounce = useDebounce();
  const handleIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    const parent = indicator?.parentElement;
    const selector = "button[data-active='true']";
    const activeButton = parent?.querySelector<HTMLButtonElement>(selector);
    if (!parent || !activeButton || !indicator) return;
    const buttonOffsetLeft = activeButton?.offsetLeft ?? 0;
    const buttonPaddingInline =
      window.getComputedStyle(activeButton).paddingInline;
    const buttonWidth = activeButton?.getBoundingClientRect().width ?? 0;
    const left = buttonOffsetLeft;
    const width = buttonWidth;
    indicator.style.setProperty("left", `${left}px`);
    indicator.style.setProperty("width", `${width}px`);
    indicator.style.setProperty("padding", `0 ${buttonPaddingInline}`);
    activeButton?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const ms = 100;
    const handleResize = () => {
      debounce(() => handleIndicator(), ms);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleIndicator, debounce]);
  useEffect(handleIndicator, [handleIndicator, active]);
  return (
    <span
      ref={indicatorRef}
      className={twMerge(
        "absolute bottom-0 left-0 w-auto h-px transition-[width,left] overflow-hidden",
        className
      )}
      {...props}
    >
      <span className="block size-full rounded-full bg-primary" />
    </span>
  );
}
export function TabButton({
  eventKey,
  className,
  children,
  onClick,
  ...props
}: TabButtonProps &
  Omit<ComponentProps<typeof Button<"button">>, keyof TabButtonProps>) {
  const { active, onChange } = useContext(TabsContext);
  const isActive = eventKey === active;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    !isActive && onChange(eventKey);
    onClick?.(e);
  };
  return (
    <Button
      as="button"
      type="button"
      data-active={isActive}
      onClick={handleClick}
      color={isActive ? "primary" : null}
      variant="text"
      className={cn("shadow-none border-none", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
export function TabItem({ eventKey, children }: TabItemProps) {
  const { active } = useContext(TabsContext);
  if (active !== eventKey) return null;
  return <Fragment>{children}</Fragment>;
}
