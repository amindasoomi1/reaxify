type AnchorPointer = { x: number; y: number };

const anchorPointers = new WeakMap<HTMLElement, AnchorPointer>();

export function setAnchorPointer(el: HTMLElement, x: number, y: number) {
  anchorPointers.set(el, { x, y });
}

export function getAnchorPointer(el: HTMLElement) {
  return anchorPointers.get(el);
}
