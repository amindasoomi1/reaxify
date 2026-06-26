import { setAnchorPointer } from "@/helpers";
import { ChildrenProps } from "@/types";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  MouseEvent,
  ReactElement,
  Ref,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

type ToggleStateContextValue = {
  open: boolean;
  anchorEl: HTMLElement | null;
  anchor: boolean;
  pointer: boolean;
};

type ToggleActionsContextValue = {
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
  setAnchorEl: (el: HTMLElement | null) => void;
};

export type ToggleRef = {
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
};

type ToggleProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  anchor?: boolean;
  pointer?: boolean;
  ref?: Ref<ToggleRef>;
} & ChildrenProps;

type ToggleTriggerProps = ChildrenProps;

type ToggleContentProps = ChildrenProps;

const ToggleStateContext = createContext<ToggleStateContextValue | null>(null);
const ToggleActionsContext = createContext<ToggleActionsContextValue | null>(
  null,
);

function composeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref) (ref as { current: T }).current = value;
    });
  };
}

export function useToggleContext() {
  const state = useContext(ToggleStateContext);
  const actions = useContext(ToggleActionsContext);
  if (!state || !actions) {
    throw new Error("useToggleContext must be used within Toggle");
  }
  return { ...state, ...actions };
}

function useToggleState() {
  const context = useContext(ToggleStateContext);
  if (!context) {
    throw new Error("Toggle subcomponents must be used within Toggle");
  }
  return context;
}

function useToggleActions() {
  const context = useContext(ToggleActionsContext);
  if (!context) {
    throw new Error("Toggle subcomponents must be used within Toggle");
  }
  return context;
}

function Toggle({
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  anchor = false,
  pointer = false,
  ref,
  children,
}: ToggleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      if (!next) setAnchorEl(null);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const openFn = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  useImperativeHandle(ref, () => ({
    open: openFn,
    close,
    toggle,
  }));

  const stateValue = useMemo(
    () => ({ open, anchorEl, anchor, pointer }),
    [open, anchorEl, anchor, pointer],
  );

  const actionsValue = useMemo(
    () => ({ open: openFn, close, toggle, setAnchorEl }),
    [openFn, close, toggle],
  );

  return (
    <ToggleActionsContext.Provider value={actionsValue}>
      <ToggleStateContext.Provider value={stateValue}>
        {children}
      </ToggleStateContext.Provider>
    </ToggleActionsContext.Provider>
  );
}

function ToggleTrigger({ children }: ToggleTriggerProps) {
  const { open, pointer } = useToggleState();
  const { toggle, setAnchorEl, open: openFn } = useToggleActions();

  if (!isValidElement(children)) return children;

  const child = Children.only(children) as ReactElement<{
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    onContextMenu?: (e: MouseEvent<HTMLElement>) => void;
    ref?: Ref<HTMLElement>;
    "aria-expanded"?: boolean;
  }>;

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    child.props.onClick?.(e);
    setAnchorEl(e.currentTarget);
    toggle();
  };

  const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    child.props.onContextMenu?.(e);
    setAnchorPointer(e.currentTarget, e.clientX, e.clientY);
    setAnchorEl(e.currentTarget);
    openFn();
  };

  if (pointer) {
    return cloneElement(child, {
      "aria-expanded": open,
      onContextMenu: handleContextMenu,
      ref: composeRefs(child.props.ref),
    });
  }

  return cloneElement(child, {
    "aria-expanded": open,
    onClick: handleClick,
    ref: composeRefs(child.props.ref),
  });
}

function ToggleContent({ children }: ToggleContentProps) {
  const { open, anchorEl, anchor, pointer } = useToggleState();
  const { close } = useToggleActions();

  if (!isValidElement(children)) return children;

  const child = Children.only(children) as ReactElement<{
    open?: boolean;
    onClose?: VoidFunction;
    anchorEl?: HTMLElement | null;
    anchorPointer?: boolean;
  }>;

  return cloneElement(child, {
    open,
    onClose: close,
    ...(anchor && { anchorEl }),
    ...(pointer && { anchorPointer: true }),
  });
}

Toggle.Trigger = ToggleTrigger;
Toggle.Content = ToggleContent;

export default Toggle;
