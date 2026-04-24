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
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "../../helpers";
import { useClasses } from "../../hooks";
import Button from "../Button";

type TabsProps = {
  active?: null | string;
  onChange?: Dispatch<string>;
} & ChildrenProps;
type TabButtonProps = {
  eventKey: string;
  type?: never;
  ref?: never;
  className?: string | ((options: { isActive: boolean }) => string | undefined);
};
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

function Tabs({ active = null, onChange = () => {}, children }: TabsProps) {
  const classes = useClasses((c) => c.tabs.buttonGroup.base);
  const buttonGroupClasses = useMemo(() => {
    return cn("relative flex items-center", classes) as string;
  }, [classes]);
  return (
    <TabsContext.Provider value={{ active, onChange, buttonGroupClasses }}>
      {children}
    </TabsContext.Provider>
  );
}
function TabIndicator({
  className,
  ...props
}: Omit<ComponentProps<"span">, "children">) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const classes = useClasses((c) => c.tabs.indicator.base);
  const { active } = useContext(TabsContext);
  const indicatorRef = useRef<HTMLSpanElement>(null);
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
    indicator.style.setProperty("--left", `${left}px`);
    indicator.style.setProperty("--width", `${width}px`);
    indicator.style.setProperty("--padding-x", `${buttonPaddingInline}`);
  }, []);
  useEffect(() => {
    handleIndicator();
    requestAnimationFrame(() => setHasAnimated(true));
  }, [handleIndicator, active]);
  return (
    <span
      ref={indicatorRef}
      className={twMerge(
        "absolute bottom-0 left-(--left,0px) rtl:left-(--left,100%) w-(--width,0px) px-(--padding-x,0px) h-px overflow-hidden",
        hasAnimated ? "transition-[width,left,padding]" : "",
        classes,
        className,
      )}
      {...props}
    >
      <span className="block size-full rounded-full bg-primary" />
    </span>
  );
}
function TabButton({
  eventKey,
  className,
  children,
  onClick,
  ...props
}: TabButtonProps &
  Omit<ComponentProps<typeof Button<"button">>, keyof TabButtonProps>) {
  const baseClasses = useClasses((c) => c.tabs.button.base);
  const activeClasses = useClasses((c) => c.tabs.button.active);
  const { active, onChange } = useContext(TabsContext);
  const isActive = eventKey === active;
  const handleClassName = useMemo(() => {
    if (typeof className === "function") {
      return className({ isActive });
    }
    return className;
  }, [isActive, className]);
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
      color={isActive ? "primary" : "dark"}
      variant="text"
      className={cn(
        "shadow-none border-none",
        baseClasses,
        isActive && activeClasses,
        handleClassName,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
function TabItem({ eventKey, children }: TabItemProps) {
  const { active } = useContext(TabsContext);
  if (active !== eventKey) return null;
  return <Fragment>{children}</Fragment>;
}

Tabs.Indicator = TabIndicator;
Tabs.Button = TabButton;
Tabs.Item = TabItem;

export default Tabs;
