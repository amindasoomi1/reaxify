import { useClasses } from "@/hooks";
import { ComponentPropsWithAs, ComponentPropsWithoutAs, Size } from "@/types";
import {
  createContext,
  Dispatch,
  ElementType,
  SyntheticEvent,
  useContext,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type AvatarContextType = {
  size: Size;
  isImageLoaded: boolean | null;
  setIsImageLoaded: Dispatch<boolean>;
};
type AvatarProps = {
  size?: Size;
};
type AvatarImageProps = {
  src: string | null | undefined;
  alt: string | null | undefined;
  loading?: never;
};
type Sizes = {
  [key in Size]?: string;
};

const AvatarContext = createContext<AvatarContextType>({
  size: "md",
  isImageLoaded: null,
  setIsImageLoaded: () => {},
});

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
      className={twMerge("flex -space-x-2", classes, className)}
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const sizeClasses = useMemo(() => {
    if (!size) return null;
    const sizes: Sizes = {
      sm: "size-6 [&_svg]:size-3",
      md: "size-8 [&_svg]:size-4",
      lg: "size-10 [&_svg]:size-5",
    };
    return [sizes?.[size], classes?.size?.[size]];
  }, [size, classes?.size]);
  return (
    <Component
      className={twMerge(
        "relative flex items-center justify-center bg-light ring-2 ring-light rounded-full select-none",
        classes?.base,
        sizeClasses,
        className,
      )}
      {...props}
    >
      <AvatarContext.Provider value={{ size, isImageLoaded, setIsImageLoaded }}>
        {children}
      </AvatarContext.Provider>
    </Component>
  );
}
function AvatarImage({
  src,
  alt,
  className,
  onLoad,
  ...props
}: ComponentPropsWithoutAs<"img", AvatarImageProps>) {
  const classes = useClasses((c) => c.avatar.image.base);
  const { isImageLoaded, setIsImageLoaded } = useContext(AvatarContext);
  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsImageLoaded(true);
    onLoad?.(e);
  };
  return (
    <img
      src={src || undefined}
      alt={alt || undefined}
      className={twMerge(
        "aspect-square size-full rounded-full object-cover",
        isImageLoaded ? "block" : "hidden",
        classes,
        className,
      )}
      onLoad={handleLoad}
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
  const { size, isImageLoaded } = useContext(AvatarContext);
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
        "flex size-full items-center justify-center rounded-full text-dark",
        isImageLoaded ? "hidden" : "flex",
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
  const classes = useClasses((c) => c.avatar.count.base);
  return (
    <span
      className={twMerge("text-sm text-dark font-medium", classes, className)}
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
