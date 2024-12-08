export function zip<T>(a: T[], b: T[]): [T, T][] {
  if (a.length !== b.length) throw new Error("zip: length mismatch");
  return a.map((x, i) => [x, b[i]]);
}

export function inRange(x: number, lo: number, hi: number) {
  if (lo > hi) {
    const t = lo;
    lo = hi;
    hi = t;
  }

  return lo <= x && x < hi;
}

export function printGrid(grid: unknown[][]) {
  console.log(grid.map((row) => row.join("")).join("\n"));
}
