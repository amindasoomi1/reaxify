import { useClasses } from "@/hooks";
import { ComponentPropsWithoutAs } from "@/types";
import { twMerge } from "tailwind-merge";

type SkeletonProps = ComponentPropsWithoutAs<"span", { children?: never }>;

export default function Spacer({ className, ...props }: SkeletonProps) {
  const classes = useClasses((c) => c.spacer.base);
  return (
    <span className={twMerge("flex-1", classes, className)} {...props}></span>
  );
}
