import {
  ThemeProviderContext,
  ThemeProviderContextType,
} from "@/providers/ThemeProvider";
import { useContext, useMemo } from "react";

type Classes = ThemeProviderContextType["classes"];

export default function useClasses<T = string>(
  selector: (classes: Classes) => T
): T | null {
  const context = useContext(ThemeProviderContext);

  const result = useMemo(() => {
    if (!context?.classes) return null;
    try {
      const value = selector(context.classes as Classes);
      return value ?? null;
    } catch (e) {
      return null;
    }
  }, [context.classes, selector]);

  return result;
}
