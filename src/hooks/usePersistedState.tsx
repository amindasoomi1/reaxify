import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

type Storage = "localStorage" | "sessionStorage";
type Config = { name: string; storage?: Storage; version?: number };

export default function usePersistedState<T>(initialValue: T, config: Config) {
  const name = useMemo(() => config.name, [config.name]);
  const storage = useMemo(
    () => config.storage ?? "localStorage",
    [config.storage]
  );
  const version = useMemo(() => config.version ?? 1, [config.version]);

  const setItem = useCallback(
    (state: T) => {
      try {
        const data = JSON.stringify({ state, version });
        window[storage].setItem(name, data);
      } catch (error) {
        console.error(error);
      }
    },
    [name, storage, version]
  );

  const getItem = useCallback(() => {
    try {
      const item = window[storage].getItem(name);
      if (!item) return undefined;
      const parsed = JSON.parse(item) as { state: T; version: number };
      if (parsed.version !== version) return undefined;
      if ("state" in parsed) return parsed.state;
      return undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [name, storage, version]);

  const [state, setState] = useState(() => {
    const value = getItem();
    return (value as T) || initialValue;
  });

  const setPersistedState: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      setState((prev) => {
        const newValue =
          // eslint-disable-next-line
          typeof value === "function" ? (value as Function)(prev) : value;
        setItem(newValue);
        return newValue;
      });
    },
    [setItem]
  );

  const clearState = useCallback(() => {
    setState(initialValue);
    localStorage.removeItem(name);
  }, [initialValue, name]);

  return [state, setPersistedState, clearState] as const;
}
