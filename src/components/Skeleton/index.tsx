import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type SkeletonProps = ComponentProps<"div">;

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        "size-10 rounded bg-gray-200 text-gray-200 animate-pulse",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
