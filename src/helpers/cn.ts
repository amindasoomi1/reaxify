type Classes = string | null | undefined | false;
export default function cn(...classes: Classes[]) {
  if (!classes.length) return undefined;
  return classes.filter(Boolean).join(" ");
}
