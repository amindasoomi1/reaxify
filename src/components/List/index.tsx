import { useClasses } from "@/hooks";
import { ComponentPropsWithAs, ComponentPropsWithoutAs } from "@/types";
import { useHotkey } from "@tanstack/react-hotkeys";
import { ElementType, MouseEvent, Ref, useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";

type ListProps = {
  divided?: boolean;
};

type ListItemProps = {
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
};

function List<E extends ElementType = "ul">({
  as,
  divided = false,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E, ListProps>) {
  const Component = as || "ul";
  const classes = useClasses((c) => c.list?.base);

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
      {children}
    </Component>
  );
}

function ListItem<E extends ElementType = "li">({
  as,
  hover = false,
  active = false,
  disabled = false,
  className,
  children,
  tabIndex,
  onClick,
  ...props
}: ComponentPropsWithAs<E, ListItemProps>) {
  const Component = as || "li";
  const classes = useClasses((c) => c.list?.item);
  const itemRef = useRef<HTMLElement>(null);

  const isFocusable = hover && !disabled;
  const hotkeyEnabled = isFocusable && !!onClick;

  const activate = useCallback(
    (event: KeyboardEvent) => {
      if (disabled || !onClick) return;
      onClick(event as unknown as MouseEvent<E>);
    },
    [disabled, onClick],
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

  return (
    <Component
      ref={itemRef as Ref<HTMLLIElement>}
      data-name="list-item"
      tabIndex={tabIndex ?? (isFocusable ? 0 : undefined)}
      aria-disabled={disabled || undefined}
      aria-current={active ? "true" : undefined}
      className={twMerge(
        "flex items-center gap-3 px-4 py-3 min-w-0 w-full",
        hover &&
          "cursor-pointer transition-colors hover:bg-dark/5 [user-select:none]",
        hover && classes?.hover,
        active && "bg-primary/10 text-primary",
        active && classes?.active,
        disabled &&
          "opacity-75 cursor-not-allowed pointer-events-none select-none",
        disabled && classes?.disabled,
        classes?.base,
        className,
      )}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </Component>
  );
}

function ListIcon({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  const classes = useClasses((c) => c.list?.icon?.base);

  return (
    <div
      data-name="list-icon"
      className={twMerge(
        "shrink-0 flex items-center justify-center [&_svg]:size-5.5",
        classes,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ListContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  const classes = useClasses((c) => c.list?.content?.base);

  return (
    <div
      data-name="list-content"
      className={twMerge("flex-1 min-w-0 space-y-px", classes, className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ListAction({
  className,
  children,
  onClick,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  const classes = useClasses((c) => c.list?.action?.base);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div
      data-name="list-action"
      className={twMerge("shrink-0 self-center", classes, className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}

List.Item = ListItem;
List.Icon = ListIcon;
List.Content = ListContent;
List.Action = ListAction;

export default List;
