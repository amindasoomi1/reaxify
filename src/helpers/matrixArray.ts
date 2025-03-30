export default function matrixArray<T>(
  arr: T[],
  perSubArray: number = 1
): T[][] {
  const matrix: T[][] = [];
  let i: number;
  let k: number;
  for (i = 0, k = -1; i < arr.length; i++) {
    if (i % perSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(arr[i]);
  }
  return matrix;
}
