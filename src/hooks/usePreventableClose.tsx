import { useHotkey } from "@tanstack/react-hotkeys";
import { useCallback } from "react";

type Options = {
  preventClose?: boolean;
  open?: boolean;
  onClose?: () => void;
};

export default function usePreventableClose({
  preventClose = false,
  open = false,
  onClose = () => {},
}: Options) {
  const dismiss = useCallback(() => {
    if (preventClose) return;
    onClose();
  }, [preventClose, onClose]);

  useHotkey("Escape", dismiss, {
    conflictBehavior: "allow",
    ignoreInputs: true,
    enabled: open && !preventClose,
  });

  return dismiss;
}
