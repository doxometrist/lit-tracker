export function range(start: number, end: number, step = 1): number[] {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}
