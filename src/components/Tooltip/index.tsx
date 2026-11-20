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
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import Portal from "../Portal";

type Placement = "top" | "end" | "bottom" | "start";

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

type AnchorRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
};

type TooltipSize = {
  width: number;
  height: number;
  contentWidth: number;
  contentHeight: number;
};

type TooltipCoords = {
  left: number;
  right: number;
  top: number;
  arrowX: number;
  arrowY: number;
  visible: boolean;
};

const ROOT_POSITION_CLASSES =
  "top-(--top) left-(--left) right-auto rtl:left-auto rtl:right-(--right)";

type Colors = {
  [key in Color]?: string;
};

const GAP = 0;
const VIEWPORT_PADDING = 16;
const ARROW_EDGE_INSET = 14;

const TooltipContext = createContext<TooltipContextType>({
  placement: "top",
  color: "dark",
  transitionState: "unmounted",
});

function useTooltipContext() {
  return useContext(TooltipContext);
}

function clamp(value: number, min: number, max: number) {
  if (max < min) return Math.max(min, (min + max) / 2);
  return Math.min(Math.max(value, min), max);
}

function anchorIntersectsViewport(
  anchor: AnchorRect,
  viewportWidth: number,
  viewportHeight: number,
) {
  return (
    anchor.bottom > 0 &&
    anchor.top < viewportHeight &&
    anchor.right > 0 &&
    anchor.left < viewportWidth
  );
}

function anchorDirectionIsRtl(anchorEl: HTMLElement) {
  return getComputedStyle(anchorEl).direction === "rtl";
}

function getAnchorRect(
  anchorEl: HTMLElement,
  anchorPointer: boolean,
): AnchorRect | null {
  if (anchorPointer) {
    const point = getAnchorPointer(anchorEl);
    if (!point) return null;
    const { x, y } = point;
    return {
      left: x,
      right: x,
      top: y,
      bottom: y,
      centerX: x,
      centerY: y,
    };
  }

  const rect = anchorEl.getBoundingClientRect();
  return {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  };
}

function getTooltipSize(container: HTMLElement): TooltipSize {
  const shell = container.firstElementChild as HTMLElement | null;
  const content = container.querySelector<HTMLElement>(
    '[data-name="tooltip-content"]',
  );
  const box = shell ?? container;
  return {
    width: box.offsetWidth,
    height: box.offsetHeight,
    contentWidth: content?.offsetWidth ?? box.offsetWidth,
    contentHeight: content?.offsetHeight ?? box.offsetHeight,
  };
}

function clampArrowShift(offset: number, axisSize: number) {
  const limit = Math.max(0, axisSize / 2 - ARROW_EDGE_INSET);
  return clamp(offset, -limit, limit);
}

function computeCoords(
  placement: Placement,
  anchor: AnchorRect,
  size: TooltipSize,
  viewportWidth: number,
  viewportHeight: number,
  anchorRtl: boolean,
): TooltipCoords {
  const { width, height, contentWidth, contentHeight } = size;
  const visible = anchorIntersectsViewport(
    anchor,
    viewportWidth,
    viewportHeight,
  );

  let left: number;
  let top: number;
  let arrowX = 0;
  let arrowY = 0;

  switch (placement) {
    case "top":
      left = anchor.centerX - width / 2;
      top = anchor.top - height - GAP;
      break;
    case "bottom":
      left = anchor.centerX - width / 2;
      top = anchor.bottom + GAP;
      break;
    case "start":
      left = anchorRtl
        ? anchor.right + GAP
        : anchor.left - width - GAP;
      top = anchor.centerY - height / 2;
      break;
    case "end":
      left = anchorRtl
        ? anchor.left - width - GAP
        : anchor.right + GAP;
      top = anchor.centerY - height / 2;
      break;
  }

  if (placement === "top" || placement === "bottom") {
    const paddedLeft = clamp(
      left,
      VIEWPORT_PADDING,
      viewportWidth - width - VIEWPORT_PADDING,
    );
    arrowX = clampArrowShift(
      anchor.centerX - (paddedLeft + width / 2),
      contentWidth,
    );
    left = paddedLeft;
  }

  if (placement === "start" || placement === "end") {
    const paddedTop = clamp(
      top,
      VIEWPORT_PADDING,
      viewportHeight - height - VIEWPORT_PADDING,
    );
    arrowY = clampArrowShift(
      anchor.centerY - (paddedTop + height / 2),
      contentHeight,
    );
    top = paddedTop;
  }

  const right = viewportWidth - left - width;

  return { left, right, top, arrowX, arrowY, visible };
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
  const rootRef = useRef<HTMLDivElement | null>(null);

  const transitionClasses: TransitionClasses = {
    entering: "scale-100 opacity-100",
    entered: "scale-100 opacity-100",
    exiting: "scale-75 opacity-0",
    exited: "scale-75 opacity-0",
    unmounted: "",
  };

  const transformOrigin = useMemo(() => {
    const origins: Record<Placement, string> = {
      top: "origin-bottom rtl:origin-bottom-right",
      bottom: "origin-top rtl:origin-top-right",
      start: "origin-right rtl:origin-left",
      end: "origin-left rtl:origin-right",
    };
    return origins[placement];
  }, [placement]);

  const shellLayout = useMemo(() => {
    const layouts: Record<Placement, string> = {
      top: "relative w-fit pb-2.5",
      bottom: "relative w-fit pt-2.5",
      start: "relative w-fit pe-2.5",
      end: "relative w-fit ps-2.5",
    };
    return [layouts[placement], classes?.placement?.[placement]];
  }, [placement, classes?.placement]);

  const updatePosition = useCallback(() => {
    const root = rootRef.current;
    if (!open || !anchorEl || !root) return;

    const anchor = getAnchorRect(anchorEl, anchorPointer);
    if (!anchor) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const size = getTooltipSize(root);
    const coords = computeCoords(
      placement,
      anchor,
      size,
      viewportWidth,
      viewportHeight,
      anchorDirectionIsRtl(anchorEl),
    );

    root.style.setProperty("--left", `${coords.left}px`);
    root.style.setProperty("--right", `${coords.right}px`);
    root.style.setProperty("--top", `${coords.top}px`);
    root.style.setProperty("--arrow-x", `${coords.arrowX}px`);
    root.style.setProperty("--arrow-y", `${coords.arrowY}px`);
    root.style.visibility = coords.visible ? "" : "hidden";
  }, [open, anchorEl, anchorPointer, placement]);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, children]);

  useEffect(() => {
    if (!open) return;

    updatePosition();
    window.addEventListener("resize", updatePosition);
    document.addEventListener("scroll", updatePosition, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  return (
    <Portal>
      <Transition
        nodeRef={rootRef}
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
              ref={rootRef}
              data-name="tooltip"
              style={{ transitionDuration: `${duration}ms` }}
              className={twMerge(
                "fixed z-1 pointer-events-none [--arrow-x:0px] [--arrow-y:0px] transition-[scale,opacity]",
                ROOT_POSITION_CLASSES,
                transformOrigin,
                classes?.base,
                transitionClasses[state],
                className,
              )}
            >
              <div className={twMerge(shellLayout)}>{children}</div>
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
        "relative z-1 block max-w-xs text-center text-sm wrap-break-word rounded px-3 py-1",
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
    const map: Record<Placement, string> = {
      top: "absolute bottom-0 left-[calc(50%+var(--arrow-x,0px))] z-1 -translate-x-1/2 -translate-y-3/5",
      bottom:
        "absolute top-0 left-[calc(50%+var(--arrow-x,0px))] z-1 -translate-x-1/2 translate-y-3/5",
      start:
        "absolute end-0 top-[calc(50%+var(--arrow-y,0px))] z-1 -translate-x-3/5 -translate-y-1/2 rtl:translate-x-3/5",
      end: "absolute start-0 top-[calc(50%+var(--arrow-y,0px))] z-1 -translate-y-1/2 translate-x-3/5 rtl:-translate-x-3/5",
    };
    return map[placement];
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
        "block size-2.5 min-h-2.5 min-w-2.5 shrink-0 rotate-45 rounded-sm",
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