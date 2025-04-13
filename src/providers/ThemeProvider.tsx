import { ChildrenProps, DeepPartial } from "@/types";
import { createContext } from "react";

export type ThemeProviderContextType = {
  classes: {
    accordionItem: {
      base: string;
    };
    accordionToggle: {
      base: string;
    };
    accordionIcon: {
      base: string;
      active: string;
      inactive: string;
    };
    accordionBody: {
      base: string;
    };
  };
};
type Props = ChildrenProps & DeepPartial<ThemeProviderContextType>;

export const ThemeProviderContext = createContext<
  DeepPartial<ThemeProviderContextType>
>({});

export default function ThemeProvider({ classes, children }: Props) {
  return (
    <ThemeProviderContext.Provider value={{ classes }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
