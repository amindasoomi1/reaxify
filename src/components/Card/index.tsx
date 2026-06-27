import { asComponent } from "@/helpers";
import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

function Card<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.card.base);
  const Component = asComponent(as, "div");
  return (
    <Component
      data-name="card"
      className={twMerge(
        "block w-full bg-white rounded shadow",
        classes,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
function CardHeader<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.card.header.base);
  const Component = asComponent(as, "div");
  return (
    <Component
      data-name="card-header"
      className={twMerge(
        "w-full border-b border-border p-4",
        classes,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
function CardBody<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.card.body.base);
  const Component = asComponent(as, "div");
  return (
    <Component
      data-name="card-body"
      className={twMerge("w-full p-4", classes, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
function CardFooter<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.card.footer.base);
  const Component = asComponent(as, "div");
  return (
    <Component
      data-name="card-footer"
      className={twMerge(
        "w-full border-t border-border p-4",
        classes,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
