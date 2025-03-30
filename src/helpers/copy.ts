export default async function copy(str: string) {
  const support = !!navigator?.clipboard?.writeText;
  if (!support) return Promise.reject(false);
  return await navigator?.clipboard
    ?.writeText(str)
    .then(() => true)
    .catch(() => false);
}
