import { useEffect, useState } from "react";

export default function useMouse() {
  const [offset, setOffset] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const mouseHandler = (e: MouseEvent) => {
      setOffset([e.x, e.y]);
    };
    const touchHandler = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      setOffset([touch.clientX, touch.clientY]);
    };
    window.addEventListener("mousemove", mouseHandler);
    window.addEventListener("touchmove", touchHandler);
    return () => {
      window.removeEventListener("mousemove", mouseHandler);
      window.removeEventListener("touchmove", touchHandler);
    };
  }, []);
  return offset;
}
