import { useClasses } from "@/hooks";
import { ComponentPropsWithAs, ComponentPropsWithoutAs, Size } from "@/types";
import { createContext, ElementType, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type AvatarContextType = {
  size: Size;
};
type AvatarProps = {
  size?: Size;
};
type Sizes = {
  [key in Size]?: string;
};

const AvatarContext = createContext<AvatarContextType>({ size: "md" });

function AvatarGroup<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.avatar.group.base);
  const Component = as || "div";
  return (
    <Component
      className={twMerge(
        "flex -space-x-2 *:ring-2 *:ring-light",
        classes,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
function Avatar<E extends ElementType = "div">({
  as,
  className,
  size = "md",
  children,
  ...props
}: ComponentPropsWithAs<E, AvatarProps>) {
  const classes = useClasses((c) => c.avatar);
  const Component = as || "div";
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
    };
    return [sizes?.[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  return (
    <Component
      className={twMerge(
        "relative flex rounded-full select-none",
        classes?.base,
        sizeClasses,
        className,
      )}
      {...props}
    >
      <AvatarContext.Provider value={{ size }}>
        {children}
      </AvatarContext.Provider>
    </Component>
  );
}
function AvatarImage({ className, ...props }: ComponentPropsWithoutAs<"img">) {
  const classes = useClasses((c) => c.avatar.image.base);
  return (
    <img
      className={twMerge(
        "aspect-square size-full rounded-full object-cover",
        classes,
        className,
      )}
      loading="lazy"
      {...props}
    />
  );
}
function AvatarFallback({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"div">) {
  const classes = useClasses((c) => c.avatar.fallback);
  const { size } = useContext(AvatarContext);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    };
    return [sizes?.[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  return (
    <div
      className={twMerge(
        "flex size-full items-center justify-center rounded-full bg-light text-dark",
        classes?.base,
        sizeClasses,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
function AvatarBadge({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"span">) {
  const classes = useClasses((c) => c.avatar.badge);
  const { size } = useContext(AvatarContext);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "size-2 [&_svg]:hidden",
      md: "size-2.5 [&_svg]:size-2",
      lg: "size-3 [&_svg]:size-2",
    };
    return [sizes?.[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  return (
    <span
      className={twMerge(
        "absolute right-0 bottom-0 bg-success z-10 inline-flex items-center justify-center rounded-full ring-2 ring-light",
        classes?.base,
        sizeClasses,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
function AvatarCount({
  className,
  children,
  ...props
}: ComponentPropsWithoutAs<"span">) {
  const classes = useClasses((c) => c.avatar.count);
  const { size } = useContext(AvatarContext);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "[&_svg]:size-3",
      md: "[&_svg]:size-4",
      lg: "[&_svg]:size-5",
    };
    return [sizes?.[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  return (
    <span
      className={twMerge("text-sm", classes?.base, sizeClasses, className)}
      {...props}
    >
      {children}
    </span>
  );
}

Avatar.Group = AvatarGroup;
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
Avatar.Badge = AvatarBadge;
Avatar.Count = AvatarCount;

export default Avatar;
