import { Dispatch, RefObject, useEffect } from "react";

type Ref = RefObject<HTMLElement> | HTMLElement | null;

export default function useOutsideClick(
  ref: Ref,
  callback: Dispatch<MouseEvent>
) {
  useEffect(() => {
    if (!ref) return;
    const isRefObject = "current" in ref;
    const element = isRefObject ? ref.current : ref;
    if (!element) return;
    const handler = (e: MouseEvent) => {
      const outside = !element.contains(e.target as Node);
      if (outside) callback(e);
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [ref, callback]);
}
