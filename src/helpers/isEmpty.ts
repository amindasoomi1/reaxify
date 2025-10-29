export function isEmpty<T>(value: T): value is Extract<T, null | undefined> {
  return (
    isEmptyValue(value) ||
    isEmptyString(value) ||
    isEmptyObject(value) ||
    isEmptyArray(value)
  );
}
export function isEmptyValue<T>(
  value: T
): value is Extract<T, null | undefined> {
  return value === null || value === undefined;
}
export function isEmptyString<T>(value: T) {
  return value === "";
}
export function isEmptyObject<T>(value: T) {
  const isArray = Array.isArray(value);
  const isObject = typeof value === "object";
  return !isArray && isObject && !Object.keys(value ?? {}).length;
}
export function isEmptyArray<T>(value: T) {
  const isArray = Array.isArray(value);
  return isArray && !value.length;
}
