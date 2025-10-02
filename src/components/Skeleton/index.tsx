import { useClasses } from "@/hooks";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type SkeletonProps = ComponentProps<"div">;

export default function Skeleton({
  className,
  children,
  ...props
}: SkeletonProps) {
  const classes = useClasses((c) => c.skeleton.base);
  return (
    <span
      className={twMerge(
        "inline-block size-10 rounded bg-gray-200 text-gray-200 animate-pulse",
        classes,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
