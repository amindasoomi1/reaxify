// eslint-disable-next-line
export default function getByPath<T = any, R = any>(
  obj: T,
  path: string,
  defaultValue?: R
): R | null {
  if (!path) return defaultValue ?? null;
  // eslint-disable-next-line
  return path.split(".").reduce((acc: any, key: string) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc[key] as R) ?? null;
    }
    return defaultValue ?? null;
  }, obj);
}
