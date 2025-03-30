import { useCallback, useEffect, useState } from "react";

type Variant = "localStorage" | "sessionStorage";

export default function usePersistedState<T>(
  key: string,
  initialValue: T,
  variant: Variant = "localStorage"
) {
  const setItem = useCallback(
    (value: unknown) => {
      try {
        window[variant].setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    },
    [key, variant]
  );
  const getItem = useCallback(() => {
    try {
      const item = window[variant].getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(error);
    }
  }, [key, variant]);
  const [state, setState] = useState(() => {
    const value = getItem();
    return (value as T) || initialValue;
  });
  const clearState = () => {
    setState(initialValue);
    setItem(initialValue);
  };

  useEffect(() => {
    setItem(state);
  }, [state, setItem]);
  return [state, setState, clearState] as const;
}
