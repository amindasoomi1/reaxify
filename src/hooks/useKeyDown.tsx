import { useEffect } from "react";

export default function useKeyDown(
  callback?: (key: string) => void,
  targetKey: null | string | string[] = null,
  force: boolean = true
) {
  useEffect(() => {
    if (!callback || !force) return;
    const isTargetKey = (pressedKey: string) => {
      if (!targetKey) return true;
      if (Array.isArray(targetKey)) {
        return targetKey.includes(pressedKey);
      }
      return pressedKey === targetKey;
    };
    const handleSetKey = (e: KeyboardEvent) => {
      if (isTargetKey(e.key)) callback(e.key);
    };
    window.addEventListener("keydown", handleSetKey);
    return () => {
      window.removeEventListener("keydown", handleSetKey);
    };
  }, [callback, targetKey, force]);
}
