import { useClasses } from "@/hooks";
import { ComponentPropsWithoutAs } from "@/types";
import { twMerge } from "tailwind-merge";

type SpacerProps = ComponentPropsWithoutAs<"div", { children?: never }>;

export default function Spacer({ className, ...props }: SpacerProps) {
  const classes = useClasses((c) => c.spacer.base);
  return (
    <div
      className={twMerge("block flex-1", classes, className)}
      {...props}
    ></div>
  );
}
