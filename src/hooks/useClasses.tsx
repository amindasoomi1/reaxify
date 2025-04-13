import {
  ThemeProviderContext,
  ThemeProviderContextType,
} from "@/providers/ThemeProvider";
import { useContext, useMemo } from "react";

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

type Path<T> = {
  [K in keyof T]: T[K] extends object ? K | Join<K, Path<T[K]>> : K;
}[keyof T];
type Split<S extends string> = S extends `${infer T}.${infer U}`
  ? [T, ...Split<U>]
  : [S];

type ValidClassPaths = Split<Path<ThemeProviderContextType["classes"]>>;

export default function useClasses(path: ValidClassPaths) {
  const context = useContext(ThemeProviderContext);
  const classes = useMemo(() => {
    let result = context?.classes ?? {};
    for (const key of path) {
      if (typeof result !== "object" || !(key in result)) {
        return null;
      }
      // eslint-disable-next-line
      // @ts-ignore
      result = result[key];
    }
    const isString = typeof result === "string";
    if (isString) return result as string;
    return null;
  }, [context.classes, path]);

  return classes;
}
