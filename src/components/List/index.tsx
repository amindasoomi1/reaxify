import { asComponent } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { useHotkey } from "@tanstack/react-hotkeys";
import {
  createContext,
  ElementType,
  MouseEvent,
  Ref,
  useCallback,
  useContext,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

type ListContextType = {
  hover: boolean;
  disabled: boolean;
};

type ListProps = {
  divided?: boolean;
  hover?: boolean;
  disabled?: boolean;
};

type ListItemProps = {
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
};

const ListContext = createContext<ListContextType>({
  hover: false,
  disabled: false,
});

function List<E extends ElementType = "ul">({
  as,
  divided = false,
  hover = false,
  disabled = false,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, ListProps>) {
  const classes = useClasses((c) => c.list?.base);
  const Component = asComponent(as, "ul");

  return (
    <Component
      data-name="list"
      className={twMerge(
        "w-full list-none p-0 m-0",
        divided && "divide-y divide-border",
        classes,
        className,
      )}
      {...props}
    >
      <ListContext.Provider value={{ hover, disabled }}>
        {children}
      </ListContext.Provider>
    </Component>
  );
}

function ListItem<E extends ElementType = "li">({
  as,
  hover,
  active = false,
  disabled,
  className,
  children,
  tabIndex,
  onClick,
  ...props
}: ComponentPropsWithAs<E, ListItemProps>) {
  const classes = useClasses((c) => c.list?.item);
  const { hover: listHover, disabled: listDisabled } = useContext(ListContext);
  const itemRef = useRef<HTMLElement>(null);

  const isDisabled = disabled ?? listDisabled;
  const isHoverable = (hover ?? listHover) && !isDisabled;
  const isActive = active && !isDisabled;
  const hotkeyEnabled = isHoverable && !!onClick;

  const activate = useCallback(
    (event: KeyboardEvent) => {
      if (isDisabled || !onClick) return;
      onClick(event as unknown as MouseEvent<E>);
    },
    [isDisabled, onClick],
  );

  useHotkey("Enter", activate, {
    target: itemRef,
    enabled: hotkeyEnabled,
    preventDefault: true,
  });

  useHotkey("Space", activate, {
    target: itemRef,
    enabled: hotkeyEnabled,
    preventDefault: true,
  });

  const Component = asComponent(as, "li");

  return (
    <Component
      ref={itemRef as Ref<HTMLLIElement>}
      data-name="list-item"
      tabIndex={tabIndex ?? (isHoverable ? 0 : undefined)}
      aria-disabled={isDisabled || undefined}
      aria-current={isActive ? "true" : undefined}
      className={twMerge(
        "flex items-center gap-3 px-4 py-3 min-w-0 w-full",
        isHoverable &&
          "cursor-pointer transition-colors hover:bg-dark/5 [user-select:none]",
        isHoverable && classes?.hover,
        isActive && "bg-primary/10 text-primary",
        isActive && classes?.active,
        isDisabled &&
          "opacity-75 cursor-not-allowed pointer-events-none select-none",
        isDisabled && classes?.disabled,
        classes?.base,
        className,
      )}
      onClick={isDisabled ? undefined : onClick}
      {...props}
    >
      {children}
    </Component>
  );
}

function ListIcon<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.list?.icon?.base);
  const Component = asComponent(as, "div");

  return (
    <Component
      data-name="list-icon"
      className={twMerge(
        "shrink-0 flex items-center justify-center [&_svg]:size-5.5",
        classes,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

function ListContent<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.list?.content?.base);
  const Component = asComponent(as, "div");

  return (
    <Component
      data-name="list-content"
      className={twMerge("flex-1 min-w-0 space-y-px", classes, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

function ListAction<E extends ElementType = "div">({
  as,
  className,
  children,
  onClick,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.list?.action?.base);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick?.(e as unknown as MouseEvent<E>);
  };

  const Component = asComponent(as, "div");

  return (
    <Component
      data-name="list-action"
      className={twMerge("shrink-0 self-center", classes, className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
}

List.Item = ListItem;
List.Icon = ListIcon;
List.Content = ListContent;
List.Action = ListAction;

export default List;
