import { ChildrenProps, Color, DeepPartial, Size } from "@/types";
import { createContext } from "react";

type ColorClasses<T> = {
  [key in Color]: T;
};
type SizeClasses = {
  [key in Size]: string;
};
type ActiveClasses = { active: string; inactive: string };

export type ThemeProviderContextType = {
  classes: {
    accordion: {
      item: { base: string };
      toggle: { base: string };
      icon: { base: string } & ActiveClasses;
      body: { base: string };
    };
    badge: {
      base: string;
      color: ColorClasses<{ solid: string; outline: string; soft: string }>;
      size: SizeClasses;
    };
    box: { base: string };
    button: {
      base: string;
      color: ColorClasses<{ solid: string; outline: string; text: string }>;
      size: SizeClasses;
      loading: ActiveClasses;
    };
    buttonGroup: {
      base: string;
      orientation: { horizontal: string; vertical: string };
      button: { orientation: { horizontal: string; vertical: string } };
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
    modal: {
      base: string;
      dialog: { base: string; size: { sm: string; md: string; lg: string } };
      header: { base: string };
      body: { base: string };
      footer: { base: string };
    };
    progress: {
      base: string;
      color: ColorClasses<string>;
    };
    skeleton: {
      base: string;
    };
    stack: {
      base: string;
      variants: { horizontal: string; vertical: string };
    };
    table: {
      base: string;
      container: { base: string };
      header: { base: string; sticky: string };
      body: { base: string };
      row: { base: string; bordered: string; hover: string; striped: string };
      headerCell: { base: string };
      dataCell: { base: string };
    };
    tabs: {
      indicator: { base: string };
      buttonGroup: { base: string };
      button: { base: string };
    };
    typography: {
      base: string;
      variant: {
        heading1: string;
        heading2: string;
        heading3: string;
        heading4: string;
        heading5: string;
        heading6: string;
        body1: string;
        body2: string;
      };
    };
    tooltip: {
      base: string;
      color: ColorClasses<string>;
      placement: { top: string; end: string; bottom: string; start: string };
    };
    spinner: {
      base: string;
      color: ColorClasses<string>;
      size: SizeClasses;
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
