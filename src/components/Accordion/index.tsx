import { ChildrenProps, ComponentPropsWithAs } from "@/types";
import { ArrowDown2 } from "iconsax-react";
import {
  ComponentProps,
  createContext,
  Dispatch,
  ElementType,
  MouseEvent,
  useContext,
  useMemo,
} from "react";
import AnimateHeight from "react-animate-height";
import { twMerge } from "tailwind-merge";
import { randomID } from "../../helpers";

type EventKey = string;
type AccordionContextType = {
  activeKey: null | EventKey | EventKey[];
  onChange: Dispatch<EventKey>;
};
type AccordionItemContextType = {
  eventKey: null | EventKey;
  active: boolean;
};
type AccordionProps<T extends EventKey> = {
  activeKey?: null | T | T[];
  onChange?: Dispatch<EventKey>;
};
type AccordionItemProps = {
  eventKey?: null | EventKey;
};
type AccordionCollapseProps = {
  duration?: number;
} & ChildrenProps;

const AccordionContext = createContext<AccordionContextType>({
  activeKey: null,
  onChange: () => {},
});
const AccordionItemContext = createContext<AccordionItemContextType>({
  active: false,
  eventKey: null,
});

function Accordion<T extends EventKey = "string">({
  activeKey = null,
  onChange = () => {},
  children,
}: ChildrenProps & AccordionProps<T>) {
  return (
    <AccordionContext.Provider value={{ activeKey, onChange }}>
      {children}
    </AccordionContext.Provider>
  );
}
function AccordionItem<E extends ElementType = "div">({
  as,
  eventKey: initEventKey = null,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, AccordionItemProps>) {
  const { activeKey } = useContext(AccordionContext);
  const Component = as || "div";
  const ID = useMemo(() => randomID(), []);
  const eventKey = initEventKey || ID;
  const active = useMemo(() => {
    const isArray = Array.isArray(activeKey);
    if (isArray) return activeKey.includes(eventKey);
    return eventKey === activeKey;
  }, [activeKey, eventKey]);
  return (
    <Component
      className={twMerge(
        "block w-full border border-[#e8eaee]rounded",
        className
      )}
      {...props}
    >
      <AccordionItemContext.Provider value={{ eventKey, active }}>
        {children}
      </AccordionItemContext.Provider>
    </Component>
  );
}
function AccordionToggle({
  type,
  className,
  children,
  onClick,
  ...props
}: ComponentProps<"button">) {
  const { eventKey } = useContext(AccordionItemContext);
  const { onChange } = useContext(AccordionContext);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    !!eventKey && onChange(eventKey);
    onClick?.(e);
  };
  return (
    <button
      type={type}
      className={twMerge(
        "w-full flex items-center text-start text-base px-5 py-4 rounded-t cursor-pointer",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
function AccordionIcon({
  className,
  ...props
}: Omit<ComponentProps<"svg">, "ref" | "children">) {
  const { active } = useContext(AccordionItemContext);
  return (
    <ArrowDown2
      color="currentColor"
      className={twMerge(
        "size-5 transition-transform",
        active ? "-rotate-180" : "rotate-0",
        className
      )}
      {...props}
    />
  );
}
function AccordionCollapse({
  duration = 300,
  children,
}: AccordionCollapseProps) {
  const { active } = useContext(AccordionItemContext);
  return (
    <AnimateHeight
      duration={duration}
      height={active ? "auto" : 0}
      className="w-full"
      animationStateClasses={{
        animating: "",
        animatingUp: "",
        animatingDown: "",
        static: "",
        animatingToHeightZero: "",
        animatingToHeightAuto: "",
        animatingToHeightSpecific: "",
        staticHeightZero: "",
        staticHeightAuto: "",
        staticHeightSpecific: "",
      }}
    >
      {children}
    </AnimateHeight>
  );
}
function AccordionBody({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={twMerge("w-full block px-5 py-4 rounded-b", className)}
      {...props}
    >
      {children}
    </div>
  );
}

Accordion.Item = AccordionItem;
Accordion.Toggle = AccordionToggle;
Accordion.Icon = AccordionIcon;
Accordion.Collapse = AccordionCollapse;
Accordion.Body = AccordionBody;

export default Accordion;
