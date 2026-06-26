import { portalElementStore } from "@/stores";
import { ChildrenProps } from "@/types";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
export default function Portal({ children }: ChildrenProps) {
  const element = useSyncExternalStore(
    portalElementStore.subscribe,
    portalElementStore.getElement,
    undefined,
  );
  if (!element) return null;
  return createPortal(children, element);
}
