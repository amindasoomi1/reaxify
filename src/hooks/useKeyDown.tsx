import { useEffect, useRef } from "react";

type Options = {
  skip?: boolean;
  targetKey?: null | string | string[];
};

export default function useKeyDown(
  callback: (key: string) => void,
  { skip = false, targetKey = null }: Options = {}
) {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (skip) return;
    const isTargetKey = (pressedKey: string) => {
      if (!targetKey) return true;
      if (Array.isArray(targetKey)) {
        return targetKey.includes(pressedKey);
      }
      return pressedKey === targetKey;
    };
    const handleSetKey = (e: KeyboardEvent) => {
      if (isTargetKey(e.key)) callbackRef.current(e.key);
    };
    window.addEventListener("keydown", handleSetKey);
    return () => {
      window.removeEventListener("keydown", handleSetKey);
    };
  }, [targetKey, skip]);
}
