import { useEffect, useState } from "react";

export default function useKeyDown() {
  const [key, setKey] = useState<string | null>(null);
  useEffect(() => {
    const handleSetKey = (e: KeyboardEvent) => {
      setKey(e.key);
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
  }, []);
  return key;
}
