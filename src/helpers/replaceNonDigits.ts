export default function replaceNonDigits(str: string) {
  if (!str) return "";
  const regex = /[^\d.-]/g;
  return str.replace(regex, "");
}
