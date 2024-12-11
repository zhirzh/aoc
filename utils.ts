import { readFileSync } from "fs";

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

export function readFile(file: string) {
  const { pathname } = new URL(file, import.meta.url);
  return readFileSync(pathname, "utf8");
}

export function readLines(file: string) {
  const text = readFile(file);
  return text.split("\n");
}

export function readGrid(file: string, split = "") {
  const lines = readLines(file);
  const grid = lines.map((line) => line.split(split));
  return grid.map((row) => row.map(Number));
}

export function printGrid(grid: unknown[][]) {
  console.log(grid.map((row) => row.join("")).join("\n"));
}

export function sum(nums: Iterable<number>) {
  let sum = 0;
  for (const num of nums) sum += num;
  return sum;
}
