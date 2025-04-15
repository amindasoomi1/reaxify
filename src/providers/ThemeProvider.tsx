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
    badge: {
      base: string;
      color: {
        primary: {
          solid: string;
          outline: string;
          soft: string;
        };
        secondary: {
          solid: string;
          outline: string;
          soft: string;
        };
        success: {
          solid: string;
          outline: string;
          soft: string;
        };
        info: {
          solid: string;
          outline: string;
          soft: string;
        };
        warning: {
          solid: string;
          outline: string;
          soft: string;
        };
        danger: {
          solid: string;
          outline: string;
          soft: string;
        };
        dark: {
          solid: string;
          outline: string;
          soft: string;
        };
        light: {
          solid: string;
          outline: string;
          soft: string;
        };
      };
      size: {
        sm: string;
        md: string;
        lg: string;
      };
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
