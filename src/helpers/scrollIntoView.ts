export default function scrollIntoView(
  element: HTMLElement,
  option: ScrollIntoViewOptions = {
    block: "center",
    inline: "center",
    behavior: "smooth",
  }
) {
  element.scrollIntoView(option);
}
