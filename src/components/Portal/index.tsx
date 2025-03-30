import { ChildrenProps } from "@/types";
import { useMemo } from "react";
import { createPortal } from "react-dom";
export function Portal({ children }: ChildrenProps) {
  const div = useMemo(() => {
    const id = "portal";
    const el = document.getElementById(id) || document.createElement("div");
    el.id ||= id;
    document.body.appendChild(el);
    return el;
  }, []);
  return createPortal(children, div);
}
