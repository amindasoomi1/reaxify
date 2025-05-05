import { ChildrenProps } from "@/types";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { randomID } from "../../helpers";
export default function Portal({ children }: ChildrenProps) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const div = document.createElement("div");
    const id = randomID();
    div.id = id;
    document.body.appendChild(div);
    setElement(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);
  if (!element) return null;
  return createPortal(children, element);
}
