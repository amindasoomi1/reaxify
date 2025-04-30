import { Dispatch, useEffect, useState } from "react";

export default function useKeyDown(
  targetKey?: string | string[],
  callback?: Dispatch<string>
) {
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    const isTargetKey = (pressedKey: string) => {
      if (!targetKey) return false;
      return Array.isArray(targetKey)
        ? targetKey.includes(pressedKey)
        : pressedKey === targetKey;
    };

    const handleSetKey = (e: KeyboardEvent) => {
      setKey(e.key);
      if (isTargetKey(e.key) && callback) {
        callback(e.key);
      }
    };

    const handleClearKey = () => {
      setKey(null);
    };

    window.addEventListener("keydown", handleSetKey);
    window.addEventListener("keyup", handleClearKey);
    window.addEventListener("blur", handleClearKey);

    return () => {
      window.removeEventListener("keydown", handleSetKey);
      window.removeEventListener("keyup", handleClearKey);
      window.removeEventListener("blur", handleClearKey);
    };
  }, [targetKey, callback]);

  return key;
}
