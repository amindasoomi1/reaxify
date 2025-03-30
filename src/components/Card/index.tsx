import { ComponentPropsWithAs } from "@/types";
import { ComponentProps, ElementType } from "react";
import { twMerge } from "tailwind-merge";

function Card<E extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ComponentPropsWithAs<E>) {
  const Component = as || "div";
  return (
    <Component
      className={twMerge("block w-full bg-white rounded shadow", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
function CardHeader({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={twMerge("w-full border-b p-4", className)} {...props}>
      {children}
    </div>
  );
}
function CardBody({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={twMerge("w-full p-4", className)} {...props}>
      {children}
    </div>
  );
}
function CardFooter({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={twMerge("w-full border-t p-4", className)} {...props}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
