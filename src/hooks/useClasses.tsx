import {
  ThemeProviderContext,
  ThemeProviderContextType,
} from "@/providers/ThemeProvider";
import { DeepPartial } from "@/types";
import { useContext, useMemo } from "react";

type Classes = ThemeProviderContextType["extendClasses"];

export default function useClasses<T = string>(
  selector: (extendClasses: Classes) => T
) {
  const context = useContext(ThemeProviderContext);

  const result = useMemo(() => {
    if (!context?.extendClasses) return null;
    try {
      const value = selector(context.extendClasses as Classes);
      return value ?? null;
    } catch (e) {
      return null;
    }
  }, [context.extendClasses, selector]);

  return result as DeepPartial<T> | null;
}
