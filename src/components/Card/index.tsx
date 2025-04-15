import { useClasses } from "@/hooks";
import { ComponentPropsWithAs } from "@/types";
import { ComponentProps, ElementType } from "react";
import { twMerge } from "tailwind-merge";

function Card<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const classes = useClasses((c) => c.card.base);
  const Component = as || "div";
  return (
    <Component
      className={twMerge(
        "block w-full bg-white rounded shadow",
        classes,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
function CardHeader({ className, children, ...props }: ComponentProps<"div">) {
  const classes = useClasses((c) => c.card.header.base);
  return (
    <div
      className={twMerge(
        "w-full border-b border-[#e8eaee] p-4",
        classes,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
function CardBody({ className, children, ...props }: ComponentProps<"div">) {
  const classes = useClasses((c) => c.card.body.base);
  return (
    <div className={twMerge("w-full p-4", classes, className)} {...props}>
      {children}
    </div>
  );
}
function CardFooter({ className, children, ...props }: ComponentProps<"div">) {
  const classes = useClasses((c) => c.card.footer.base);
  return (
    <div
      className={twMerge(
        "w-full border-t border-[#e8eaee] p-4",
        classes,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
