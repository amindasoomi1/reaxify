export function isEmpty(value: unknown) {
  return (
    isEmptyValue(value) ||
    isEmptyString(value) ||
    isEmptyObject(value) ||
    isEmptyArray(value)
  );
}
export function isEmptyValue(value: unknown) {
  return value === null || value === undefined;
}
export function isEmptyString(value: unknown) {
  return value === "";
}
export function isEmptyObject(value: unknown) {
  const isArray = Array.isArray(value);
  const isObject = typeof value === "object";
  return !isArray && isObject && !Object.keys(value ?? {}).length;
}
export function isEmptyArray(value: unknown) {
  const isArray = Array.isArray(value);
  return isArray && !value.length;
}
