import { ChildrenProps } from "@/types";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { randomID } from "../../helpers";
export default function Portal({ children }: ChildrenProps) {
  const div = useMemo(() => {
    const id = randomID();
    const el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
    return el;
  }, []);
  useEffect(() => {
    return () => {
      document.body.removeChild(div);
    };
  }, [div]);
  return createPortal(children, div);
}
