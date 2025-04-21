import { ChildrenProps } from "@/types";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { randomID } from "../../helpers";
export default function Portal({ children }: ChildrenProps) {
  const divRef = useRef(document.createElement("div"));
  useEffect(() => {
    const div = divRef.current;
    const id = randomID();
    div.id = id;
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);
  return createPortal(children, divRef.current);
}
