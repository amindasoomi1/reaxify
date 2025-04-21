import { cn } from "@/helpers";
import { useClasses } from "@/hooks";
import { Color, ComponentPropsWithoutAs } from "@/types";
import { cloneElement, Fragment, ReactElement, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type Placement = "top" | "end" | "bottom" | "start";
type Props = {
  title: string;
  color?: Color;
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
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"span", Props>) {
  const classes = useClasses((c) => c.tooltip);
  const [open, setOpen] = useState(false);
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
        "bottom-[calc(100%+0.5rem)] left-0 right-0 flex-col origin-bottom",
        classes?.placement?.top
      ),
      end: cn(
        "start-[calc(100%+0.5rem)] top-0 bottom-0 flex-row-reverse origin-start",
        classes?.placement?.end
      ),
      bottom: cn(
        "top-[calc(100%+0.5rem)] left-0 right-0 flex-col-reverse origin-top",
        classes?.placement?.bottom
      ),
      start: cn(
        "end-[calc(100%+0.5rem)] top-0 bottom-0 flex-row origin-end",
        classes?.placement?.start
      ),
    };
    return placements[placement];
  }, [placement, classes?.placement]);
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
      className: cn(children.props.className, "relative"),
      children: (
        <Fragment>
          {children.props.children}
          <div
            className={cn(
              "absolute flex justify-center items-center z-10 pointer-events-none transition-[scale,opacity]",
              placementClasses,
              open ? "scale-100 opacity-100" : "scale-75 opacity-0"
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
        </Fragment>
      ),
    });
  }, [
    title,
    children,
    className,
    classes?.base,
    colorClasses,
    open,
    props,
    placementClasses,
    arrowPlacementClasses,
  ]);
  return enhancedChild;
}
