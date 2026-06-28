import { getAnchorPointer } from "@/helpers";
import { useClasses } from "@/hooks";
import {
  ChildrenProps,
  Color,
  ComponentPropsWithoutAs,
  ToggleEventProps,
  ToggleProps,
} from "@/types";
import { TransitionClasses } from "@/types/internal";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import Portal from "../Portal";

type Placement = "top" | "end" | "bottom" | "start";
type Position = { left: number; right: number; top: number };

type TooltipProps = {
  anchorEl?: HTMLElement | null;
  anchorPointer?: boolean;
  placement?: Placement;
  color?: Color;
  duration?: number;
} & Partial<Omit<ToggleProps, "onClose">> &
  Partial<ToggleEventProps> &
  ChildrenProps;

type TooltipContextType = {
  placement: Placement;
  color: Color;
  transitionState: TransitionStatus;
};

type Colors = {
  [key in Color]?: string;
};

const TooltipContext = createContext<TooltipContextType>({
  placement: "top",
  color: "dark",
  transitionState: "unmounted",
});

function useTooltipContext() {
  return useContext(TooltipContext);
}

function Tooltip({
  open = false,
  anchorEl = null,
  anchorPointer = false,
  placement = "top",
  color = "dark",
  duration = 300,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  className,
  children,
}: TooltipProps & { className?: string }) {
  const classes = useClasses((c) => c.tooltip);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gap = 0;
  const offset = 16;

  const transitionClasses: TransitionClasses = {
    entering: "scale-100 opacity-100",
    entered: "scale-100 opacity-100",
    exiting: "scale-75 opacity-0",
    exited: "scale-75 opacity-0",
    unmounted: "",
  };

  const placementClasses = useMemo(() => {
    const flexDirection =
      placement === "top" || placement === "bottom" ? "flex-col" : "flex-row";
    const origins: Record<Placement, string> = {
      top: "flex-col origin-bottom",
      bottom: "flex-col-reverse origin-top",
      start: "flex-row origin-right rtl:origin-left",
      end: "flex-row-reverse origin-left rtl:origin-right",
    };
    return [flexDirection, origins[placement], classes?.placement?.[placement]];
  }, [placement, classes?.placement]);

  const setPositionProperty = useCallback((position: Position) => {
    containerRef.current?.style.setProperty("--left", `${position.left}px`);
    containerRef.current?.style.setProperty("--right", `${position.right}px`);
    containerRef.current?.style.setProperty("--top", `${position.top}px`);
  }, []);

  const positionHandler = useCallback(() => {
    if (!open || !anchorEl || !containerRef.current) return;

    const el = containerRef.current;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    let anchorLeft: number;
    let anchorRight: number;
    let anchorTop: number;
    let anchorBottom: number;
    let anchorCenterX: number;
    let anchorCenterY: number;

    if (anchorPointer) {
      const point = getAnchorPointer(anchorEl);
      if (!point) return;
      anchorLeft = point.x;
      anchorRight = point.x;
      anchorTop = point.y;
      anchorBottom = point.y;
      anchorCenterX = point.x;
      anchorCenterY = point.y;
    } else {
      const rect = anchorEl.getBoundingClientRect();
      anchorLeft = rect.left;
      anchorRight = rect.right;
      anchorTop = rect.top;
      anchorBottom = rect.bottom;
      anchorCenterX = rect.left + rect.width / 2;
      anchorCenterY = rect.top + rect.height / 2;
    }

    let left: number;
    let right: number;
    let top: number;

    switch (placement) {
      case "top":
        left = anchorCenterX - width / 2;
        right = viewportWidth - anchorCenterX - width / 2;
        top = anchorTop - height - gap;
        break;
      case "bottom":
        left = anchorCenterX - width / 2;
        right = viewportWidth - anchorCenterX - width / 2;
        top = anchorBottom + gap;
        break;
      case "start":
        left = anchorLeft - width - gap;
        right = viewportWidth - anchorRight - gap - width;
        top = anchorCenterY - height / 2;
        break;
      case "end":
        left = anchorRight + gap;
        right = viewportWidth - anchorLeft + gap;
        top = anchorCenterY - height / 2;
        break;
    }

    left = Math.min(Math.max(left, offset), viewportWidth - width - offset);
    right = Math.min(Math.max(right, offset), viewportWidth - width - offset);
    top = Math.min(Math.max(top, offset), viewportHeight - height - offset);

    setPositionProperty({ left, right, top });
  }, [open, anchorEl, anchorPointer, placement, setPositionProperty]);

  useEffect(() => {
    positionHandler();
  }, [positionHandler, children]);

  useEffect(() => {
    const handleResize = () => positionHandler();
    window.addEventListener("scroll", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [positionHandler]);

  return (
    <Portal>
      <Transition
        nodeRef={containerRef}
        in={open}
        timeout={duration}
        unmountOnExit
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        {(state) => (
          <TooltipContext.Provider
            value={{ placement, color, transitionState: state }}
          >
            <div
              ref={containerRef}
              data-name="tooltip"
              data-open={open}
              style={{ transitionDuration: `${duration}ms` }}
              className={twMerge(
                "flex items-center justify-center fixed z-1 pointer-events-none top-(--top) left-(--left) right-auto origin-top-left rtl:left-auto rtl:right-(--right) rtl:origin-top-right transition-[scale,opacity]",
                classes?.base,
                placementClasses,
                transitionClasses[state],
                className,
              )}
            >
              {children}
            </div>
          </TooltipContext.Provider>
        )}
      </Transition>
    </Portal>
  );
}

function TooltipContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"span">) {
  const classes = useClasses((c) => c.tooltip?.content);
  const { color } = useTooltipContext();

  const colorClasses = useMemo(() => {
    const colors: Colors = {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      success: "bg-success text-white",
      info: "bg-info text-white",
      warning: "bg-warning text-white",
      danger: "bg-danger text-white",
      dark: "bg-dark text-white",
      light: "bg-light text-dark",
    };
    return [colors[color], classes?.color?.[color]];
  }, [color, classes?.color]);

  return (
    <span
      role="tooltip"
      data-name="tooltip-content"
      className={twMerge(
        "relative block size-fit min-w-fit min-h-fit text-sm rounded px-3 py-1 whitespace-nowrap z-1",
        classes?.base,
        colorClasses,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

function TooltipArrow({
  className,
  ...props
}: ComponentPropsWithoutAs<"span">) {
  const classes = useClasses((c) => c.tooltip?.arrow);
  const { color, placement } = useTooltipContext();

  const placementClasses = useMemo(() => {
    const placements: Record<Placement, string> = {
      top: "-translate-y-3/5",
      bottom: "translate-y-3/5",
      start: "-translate-x-3/5 rtl:translate-x-3/5",
      end: "translate-x-3/5 rtl:-translate-x-3/5",
    };
    return placements[placement];
  }, [placement]);
  const colorClasses = useMemo(() => {
    const colors: Colors = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      success: "bg-success",
      info: "bg-info",
      warning: "bg-warning",
      danger: "bg-danger",
      dark: "bg-dark",
      light: "bg-light",
    };
    return [colors[color], classes?.color?.[color]];
  }, [color, classes?.color]);

  return (
    <span
      data-name="tooltip-arrow"
      className={twMerge(
        "block size-2.5 min-w-2.5 min-h-2.5 rotate-45 rounded-sm shrink-0",
        classes?.base,
        placementClasses,
        colorClasses,
        className,
      )}
      {...props}
    />
  );
}

Tooltip.Content = TooltipContent;
Tooltip.Arrow = TooltipArrow;

export default Tooltip;
