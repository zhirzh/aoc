import { readFileSync } from "fs";

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

export function readText(file: string) {
  const { pathname } = new URL(file, import.meta.url);
  return readFileSync(pathname, "utf8");
}

export function readLines(
  file: string,
  { split = "\n" }: { split?: string } = {}
) {
  const text = readText(file);
  return text.split(split);
}

export function readGrid(
  file: string,
  { split, colSplit = " " }: { split?: string; colSplit?: string } = {}
) {
  const lines = readLines(file, { split });
  return lines.map((line) => line.split(colSplit));
}

export function readNumbers(file: string, { split }: { split?: string } = {}) {
  const lines = readLines(file, { split });
  return lines.map(Number);
}

export function readNumberGrid(
  file: string,
  { split, colSplit }: { split?: string; colSplit?: string } = {}
) {
  const grid = readGrid(file, { split, colSplit });
  return grid.map((row) => row.map(Number));
}

export function sum(nums: Iterable<number>) {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  return sum;
}

export function zip<T>(a: T[], b: T[]): [T, T][] {
  if (a.length !== b.length) throw new Error("zip: length mismatch");
  return a.map((x, i) => [x, b[i]]);
}
