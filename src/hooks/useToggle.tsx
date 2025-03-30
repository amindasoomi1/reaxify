import { useState } from "react";

export default function useToggle(initValue: boolean = false) {
  const [state, setState] = useState(initValue);
  const toggle = () => {
    setState((p) => !p);
  };
  const deactivate = () => {
    setState(false);
  };
  return [state, toggle, deactivate] as const;
}
