import { asComponent } from "@/helpers";
import { useClasses } from "@/hooks";
import { ChildrenProps, ComponentPropsWithAs } from "@/types";
import { ElementType } from "react";
import AnimateHeight from "react-animate-height";
import { twMerge } from "tailwind-merge";

const EMPTY_ANIMATION_STATE_CLASSES = {
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
};

type CollapseProps = {
  open?: boolean;
  duration?: number;
  "data-name"?: string;
} & ChildrenProps;

function Collapse({
  open = false,
  duration = 300,
  "data-name": dataName = "collapse",
  children,
}: CollapseProps) {
  return (
    <AnimateHeight
      data-name={dataName}
      height={open ? "auto" : 0}
      duration={duration}
      className="w-full overflow-hidden"
      animationStateClasses={EMPTY_ANIMATION_STATE_CLASSES}
    >
      {children}
    </AnimateHeight>
  );
}

function CollapseContent<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.collapse.content.base);
  const Component = asComponent(as, "div");
  return (
    <Component
      data-name="collapse-content"
      className={twMerge("w-full block", classes, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

Collapse.Content = CollapseContent;

export default Collapse;
