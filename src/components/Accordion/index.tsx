import { asComponent, randomID } from "@/helpers";
import { useClasses } from "@/hooks";
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
import { twMerge } from "tailwind-merge";
import Collapse from "../Collapse";

type EventKey = string;

type AccordionSingleProps<T extends EventKey> = {
  variant?: "single";
  activeKey?: T | null;
  onChange?: Dispatch<T | null>;
} & ChildrenProps;

type AccordionMultipleProps<T extends EventKey> = {
  variant: "multiple";
  activeKey?: T[];
  onChange?: Dispatch<T[]>;
} & ChildrenProps;

type AccordionProps<T extends EventKey> =
  | AccordionSingleProps<T>
  | AccordionMultipleProps<T>;

type AccordionItemProps = {
  eventKey?: EventKey | null;
};

type AccordionCollapseProps = {
  duration?: number;
} & ChildrenProps;

type AccordionContextType<T extends EventKey> = {
  activeKey: T | T[] | null;
  handleChange: (eventKey: T) => void;
  variant: "single" | "multiple";
};

type AccordionItemContextType<T extends EventKey> = {
  eventKey: T | null;
  active: boolean;
};

// eslint-disable-next-line
const AccordionContext = createContext<AccordionContextType<any>>({
  activeKey: null,
  handleChange: () => {},
  variant: "single",
});
// eslint-disable-next-line
const AccordionItemContext = createContext<AccordionItemContextType<any>>({
  active: false,
  eventKey: null,
});

function Accordion<T extends EventKey>({
  variant = "single",
  activeKey = null,
  onChange = () => {},
  children,
}: AccordionProps<T>) {
  const handleChange = (eventKey: T) => {
    if (variant === "single") {
      const isActive = activeKey === eventKey;
      (onChange as (key: T | null) => void)(isActive ? null : eventKey);
    } else {
      const arr = Array.isArray(activeKey) ? activeKey : [];
      const isActive = arr.includes(eventKey);
      const newKeys = isActive
        ? arr.filter((k) => k !== eventKey)
        : [...arr, eventKey];
      (onChange as (key: T[]) => void)(newKeys);
    }
  };

  return (
    <AccordionContext.Provider value={{ activeKey, handleChange, variant }}>
      {children}
    </AccordionContext.Provider>
  );
}

function AccordionItem<
  E extends ElementType = "div",
  T extends EventKey = string,
>({
  as,
  eventKey: initEventKey = null,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, AccordionItemProps>) {
  const classes = useClasses((s) => s.accordion.item.base);
  const { activeKey } = useContext(AccordionContext) as AccordionContextType<T>;
  const ID = useMemo(() => randomID(), []);
  const eventKey = (initEventKey || ID) as T;

  const active = useMemo(() => {
    if (Array.isArray(activeKey)) return activeKey.includes(eventKey);
    return activeKey === eventKey;
  }, [activeKey, eventKey]);

  const Component = asComponent(as, "div");

  return (
    <Component
      data-name="accordion-item"
      className={twMerge(
        "block w-full border border-border rounded",
        classes,
        className,
      )}
      {...props}
    >
      <AccordionItemContext.Provider value={{ eventKey, active }}>
        {children}
      </AccordionItemContext.Provider>
    </Component>
  );
}

function AccordionToggle<E extends ElementType = "button">({
  as,
  type = "button",
  className,
  children,
  onClick,
  ...props
}: ComponentPropsWithAs<E, { type?: "button" | "submit" | "reset" }>) {
  const classes = useClasses((s) => s.accordion.toggle.base);
  const { eventKey } = useContext(AccordionItemContext);
  const { handleChange } = useContext(AccordionContext);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (eventKey) handleChange(eventKey);
    onClick?.(e as unknown as MouseEvent<E>);
  };

  const Component = asComponent(as, "button");

  return (
    <Component
      type={type}
      data-name="accordion-toggle"
      className={twMerge(
        "w-full flex items-center text-start text-base px-5 py-4 rounded-t cursor-pointer",
        classes,
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
}

function AccordionIcon({
  className,
  ...props
}: Omit<ComponentProps<"svg">, "ref" | "children">) {
  const classes = useClasses((s) => s.accordion.icon);
  const { active } = useContext(AccordionItemContext);

  return (
    <ArrowDown2
      color="currentColor"
      data-name="accordion-icon"
      className={twMerge(
        "size-5 transition-transform",
        classes?.base,
        active ? "-rotate-180" : "rotate-0",
        active ? classes?.active : classes?.inactive,
        className,
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
    <Collapse open={active} duration={duration} data-name="accordion-collapse">
      {children}
    </Collapse>
  );
}

function AccordionBody<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((s) => s.accordion.body.base);

  return (
    <Collapse.Content
      as={as}
      data-name="accordion-body"
      className={twMerge("px-5 py-4 rounded-b", classes, className)}
      {...(props as ComponentProps<E>)}
    >
      {children}
    </Collapse.Content>
  );
}

Accordion.Item = AccordionItem;
Accordion.Toggle = AccordionToggle;
Accordion.Icon = AccordionIcon;
Accordion.Collapse = AccordionCollapse;
Accordion.Body = AccordionBody;

export default Accordion;
