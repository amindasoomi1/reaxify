import { ChildrenProps } from "@/types";
import { Fragment } from "react";

type Props = ChildrenProps;

export default function ThemeProvider({ children }: Props) {
  return <Fragment>{children}</Fragment>;
}
