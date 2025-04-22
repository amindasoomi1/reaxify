import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { Color, ComponentPropsWithoutAs } from "@/types";
import { TransitionClasses } from "@/types/internal";

import {
  cloneElement,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Transition } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import Portal from "../Portal";

type Placement = "top" | "end" | "bottom" | "start";
type Props = {
  title: string;
  color?: Color;
  duration?: number;
  placement?: Placement;
  children?: ReactElement;
};
type Colors = {
  [key in Color]?: string;
};
export default function Tooltip({
  title,
  color = "dark",
  placement = "top",
  duration = 300,
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"span", Props>) {
  const classes = useClasses((c) => c.tooltip);
  const divRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Record<string, string>>({});
  const colorClasses = useMemo(() => {
    if (!color) return "border-transparent";
    const colors: Colors = {
      primary: cn("bg-primary text-white", classes?.color?.primary),
      secondary: cn("bg-secondary text-white", classes?.color?.secondary),
      success: cn("bg-success text-white", classes?.color?.success),
      info: cn("bg-info text-white", classes?.color?.info),
      warning: cn("bg-warning text-white", classes?.color?.warning),
      danger: cn("bg-danger text-white", classes?.color?.danger),
      dark: cn("bg-dark text-white", classes?.color?.dark),
      light: cn("bg-light text-dark", classes?.color?.light),
    };
    return colors?.[color] ?? null;
  }, [color, classes?.color]);
  const placementClasses = useMemo(() => {
    const placements = {
      top: cn(
        "w-(--width) top-(--top) left-(--left) right-(--right) translate-y-[calc(-100%-0.5rem)] flex-col origin-bottom",
        classes?.placement?.top
      ),
      end: cn(
        "h-(--height) top-(--top) bottom-(--bottom) left-(--right) translate-x-[0.5rem] flex-row-reverse origin-start",
        classes?.placement?.end
      ),
      bottom: cn(
        "w-(--width) top-(--bottom) left-(--left) right-(--right) translate-y-[0.5rem] flex-col-reverse origin-top",
        classes?.placement?.bottom
      ),
      start: cn(
        "h-(--height) top-(--top) bottom-(--bottom) left-(--left) translate-x-[calc(var(--ratio)*-100%-0.5rem)] flex-row origin-start",
        classes?.placement?.start
      ),
    };
    return placements[placement];
  }, [placement, classes?.placement]);
  const transitionClasses: TransitionClasses = {
    entering: "scale-100 opacity-100",
    entered: "scale-100 opacity-100",
    exiting: "scale-75 opacity-0",
    exited: "scale-75 opacity-0",
    unmounted: "",
  };
  const arrowPlacementClasses = useMemo(() => {
    const placements = {
      top: "mt-[-0.5rem]",
      end: "me-[-0.5rem]",
      bottom: "mb-[-0.5rem]",
      start: "ms-[-0.5rem]",
    };
    return placements[placement];
  }, [placement]);
  const enhancedChild = useMemo(() => {
    if (!children) return null;
    return cloneElement(children, {
      ref: (el: HTMLElement) => {
        triggerRef.current = el;
        // if (typeof children.ref === "function") children.ref(el);
        // else if (children.ref) (children.ref as any).current = el;
      },
      onMouseEnter: (e: React.MouseEvent) => {
        children.props.onMouseEnter?.(e);
        setOpen(true);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        children.props.onMouseLeave?.(e);
        setOpen(false);
      },
      onFocus: (e: React.FocusEvent) => {
        children.props.onFocus?.(e);
        setOpen(true);
      },
      onBlur: (e: React.FocusEvent) => {
        children.props.onBlur?.(e);
        setOpen(false);
      },
    });
  }, [children]);
  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;
    const top = rect.top;
    const left = rect.left;
    const right = rect.right;
    const bottom = rect.bottom;

    setPosition({
      "--width": `${width}px`,
      "--height": `${height}px`,
      "--top": `${top}px`,
      "--left": `${left}px`,
      "--right": `${right}px`,
      "--bottom": `${bottom}px`,
    });
  }, []);
  useEffect(() => {
    if (open) updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, placement, updatePosition]);
  return (
    <Fragment>
      {enhancedChild}
      <Portal>
        <Transition nodeRef={divRef} in={open} timeout={duration} unmountOnExit>
          {(state) => (
            <div
              // data-open={open}
              ref={divRef}
              style={position}
              className={cn(
                "fixed flex justify-center items-center z-10 pointer-events-none transition-[scale,opacity] [--ratio:1] rtl:[--ratio:-1]",
                placementClasses,
                transitionClasses[state]
              )}
            >
              <span
                className={twMerge(
                  "relative block w-fit h-fit bg-dark text-sm rounded px-2 py-px whitespace-nowrap z-[1]",
                  classes?.base,
                  colorClasses,
                  className
                )}
                {...props}
              >
                {title}
              </span>
              <span
                className={twMerge(
                  "block size-3 bg-dark rotate-45",
                  arrowPlacementClasses,
                  colorClasses
                )}
              ></span>
            </div>
          )}
        </Transition>
      </Portal>
    </Fragment>
  );
}
