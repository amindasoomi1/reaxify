import { ComponentPropsWithAs } from "@/types";
import { ElementType, forwardRef, ReactElement, Ref } from "react";

export function asComponent(
  as: ElementType | undefined,
  defaultAs: ElementType,
): ElementType {
  return (as ?? defaultAs) as ElementType;
}

export function createPolymorphicComponent<D extends ElementType>(
  defaultAs: D,
) {
  return forwardRef(function PolymorphicComponent(
    { as, ...props }: ComponentPropsWithAs<ElementType>,
    ref: Ref<unknown>,
  ) {
    const Component = asComponent(as, defaultAs);
    return <Component ref={ref} {...props} />;
  }) as <E extends ElementType = D>(
    props: ComponentPropsWithAs<E> & { ref?: Ref<unknown> },
  ) => ReactElement | null;
}
