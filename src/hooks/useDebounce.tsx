import { useCallback, useEffect, useRef } from "react";

export default function useDebounce() {
  const timeoutRef = useRef<number | null>(null);

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const debounce = useCallback(
    (callback: VoidFunction, ms: number = 1000) => {
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
