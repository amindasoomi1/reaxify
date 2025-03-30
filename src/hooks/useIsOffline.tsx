import { useEffect, useState } from "react";

export default function useIsOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const setOffline = () => setIsOffline(true);
    const setOnline = () => setIsOffline(false);
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);
    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);
  return isOffline;
}
