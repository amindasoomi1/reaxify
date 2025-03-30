import { MouseEvent, useCallback } from "react";

export default function useCreateRipple() {
  const createRipple = useCallback((e: MouseEvent<HTMLElement>) => {
    const parent =
      e.currentTarget.querySelector('[aria-label="ripple-group"]') ||
      e.currentTarget;
    const parentRect = parent.getBoundingClientRect();
    const left = e.clientX - parentRect.left;
    const top = e.clientY - parentRect.top;
    const width = parentRect.width;
    const height = parentRect.height;
    const parentSize = Math.max(width, height);
    const rippleSize = 20;
    const scale = Math.ceil(parentSize / rippleSize) * 2;
    const ripple = document.createElement("span");
    ripple.className = [
      "ripple",
      "absolute",
      "rounded-full",
      "pointer-events-none",
      "transition-[opacity,scale]",
      "duration-500",
      "bg-current",
      "size-[var(--size)] top-[var(--top)] left-[var(--left)] scale-[var(--scale)] opacity-[var(--opacity)]",
    ].join(" ");
    ripple.style.setProperty("--size", `${rippleSize}px`);
    ripple.style.setProperty("--top", `${top - rippleSize / 2}px`);
    ripple.style.setProperty("--left", `${left - rippleSize / 2}px`);
    ripple.style.setProperty("--scale", "1");
    ripple.style.setProperty("--opacity", "0.2");
    parent.appendChild(ripple);
    setTimeout(() => {
      ripple.style.setProperty("--scale", `${scale}`);
      ripple.style.setProperty("--opacity", "0");
    }, 0);
    setTimeout(() => parent.removeChild(ripple), 500);
  }, []);
  return createRipple;
}
