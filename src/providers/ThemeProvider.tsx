import { ChildrenProps, DeepPartial } from "@/types";
import { createContext } from "react";

export type ThemeProviderContextType = {
  classes: {
    accordion: {
      item: {
        base: string;
      };
      toggle: {
        base: string;
      };
      icon: {
        base: string;
        active: string;
        inactive: string;
      };
      body: {
        base: string;
      };
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
    box: {
      base: string;
    };
    button: {
      base: string;
      color: {
        primary: {
          solid: string;
          outline: string;
          text: string;
        };
        secondary: {
          solid: string;
          outline: string;
          text: string;
        };
        success: {
          solid: string;
          outline: string;
          text: string;
        };
        info: {
          solid: string;
          outline: string;
          text: string;
        };
        warning: {
          solid: string;
          outline: string;
          text: string;
        };
        danger: {
          solid: string;
          outline: string;
          text: string;
        };
        dark: {
          solid: string;
          outline: string;
          text: string;
        };
        light: {
          solid: string;
          outline: string;
          text: string;
        };
      };
      size: {
        sm: string;
        md: string;
        lg: string;
      };
      loading: {
        active: string;
        inactive: string;
      };
    };
    buttonGroup: {
      base: string;
      orientation: {
        horizontal: string;
        vertical: string;
      };
      button: {
        orientation: {
          horizontal: string;
          vertical: string;
        };
      };
    };
    card: {
      base: string;
      header: { base: string };
      body: { base: string };
      footer: { base: string };
    };
    drawer: {
      base: string;
      anchor: { start: string; end: string; top: string; bottom: string };
      menu: {
        base: string;
        anchor: { start: string; end: string; top: string; bottom: string };
      };
      header: { base: string };
      body: { base: string };
      footer: { base: string };
    };
    form: { base: string };
    inputGroup: {
      base: string;
      label: { base: string };
      stack: { base: string };
      text: { base: string };
      formControl: { base: string };
    };
    menu: {
      base: string;
      item: { base: string };
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
