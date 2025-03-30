import { useCallback, useEffect, useRef } from "react";
import { Callback } from "../types";

export default function useDebounce() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const debounce = useCallback(
    (callback: Callback, ms: number = 1000) => {
      clearTimeoutRef();
      timeoutRef.current = setTimeout(callback, ms);
    },
    [clearTimeoutRef]
  );

  useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, [clearTimeoutRef]);
  return debounce;
}
