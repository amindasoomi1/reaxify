import { useEffect, useState } from "react";

type Visibility = DocumentVisibilityState;

export default function useDocumentVisible() {
  const [visibility, setVisibility] = useState<Visibility>("visible");

  const documentVisible = visibility === "visible";

  useEffect(() => {
    const onVisibility = () => {
      setVisibility(document.visibilityState);
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return documentVisible;
}
