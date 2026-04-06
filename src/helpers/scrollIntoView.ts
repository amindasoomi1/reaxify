export default function scrollIntoView(
  el: HTMLElement | string,
  option: ScrollIntoViewOptions | boolean | undefined = {
    block: "center",
    inline: "center",
    behavior: "smooth",
  },
) {
  const isString = typeof el === "string";
  const element = isString ? document.querySelector(el) : el;
  element?.scrollIntoView(option);
}
