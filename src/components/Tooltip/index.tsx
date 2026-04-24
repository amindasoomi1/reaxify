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
  children?: ReactElement<any>;
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
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      success: "bg-success text-white",
      info: "bg-info text-white",
      warning: "bg-warning text-white",
      danger: "bg-danger text-white",
      dark: "bg-dark text-white",
      light: "bg-light text-dark",
    };
    return [colors?.[color], classes?.color?.[color]];
  }, [color, classes?.color]);
  const placementClasses = useMemo(() => {
    const base =
      "size-0 min-w-(--width) min-h-(--height) top-(--top) right-(--right) bottom-(--bottom) left-(--left) justify-end items-center p-1.5";
    const placements = {
      top: "-translate-y-full flex-col origin-bottom",
      end: "translate-x-[calc(var(--ratio)*100%)] flex-row-reverse origin-left rtl:origin-right",
      bottom: "translate-y-full flex-col-reverse origin-top",
      start:
        "translate-x-[calc(var(--ratio)*-100%)] flex-row origin-right rtl:origin-left",
    };
    return [base, placements[placement], classes?.placement?.[placement]];
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
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        children.props.onMouseEnter?.(e);
        setOpen(true);
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        children.props.onMouseLeave?.(e);
        setOpen(false);
      },
      onFocus: (e: React.FocusEvent<HTMLElement>) => {
        children.props.onFocus?.(e);
        setOpen(true);
      },
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
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
    const right = window.innerWidth - rect.right;
    const bottom = window.innerHeight - rect.bottom;

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
                ...placementClasses,
                transitionClasses[state],
              )}
            >
              <span
                className={twMerge(
                  "relative block size-fit min-w-fit min-h-fit bg-dark text-sm rounded px-2 py-px whitespace-nowrap z-[1]",
                  classes?.base,
                  colorClasses,
                  className,
                )}
                {...props}
              >
                {title}
              </span>
              <span
                className={twMerge(
                  "block size-3 min-w-3 min-h-3 bg-dark rotate-45",
                  arrowPlacementClasses,
                  colorClasses,
                )}
              ></span>
            </div>
          )}
        </Transition>
      </Portal>
    </Fragment>
  );
}
