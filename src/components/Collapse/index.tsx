import { useClasses } from "@/hooks";
import { ChildrenProps } from "@/types";
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
  className?: string;
  "data-name"?: string;
} & ChildrenProps;

export default function Collapse({
  open = false,
  duration = 300,
  className,
  "data-name": dataName = "collapse",
  children,
}: CollapseProps) {
  const classes = useClasses((c) => c.collapse.base);

  return (
    <AnimateHeight
      duration={duration}
      height={open ? "auto" : 0}
      data-name={dataName}
      className={twMerge("w-full", classes, className)}
      animationStateClasses={EMPTY_ANIMATION_STATE_CLASSES}
    >
      {children}
    </AnimateHeight>
  );
}
