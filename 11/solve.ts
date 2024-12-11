import { readGrid, sum } from "../utils";

const [stones] = readGrid("./11/input", " ");

function solve(n: number) {
  let stoneCounts = new Map<number, number>();
  for (const x of stones) stoneCounts.set(x, (stoneCounts.get(x) ?? 0) + 1);

  for (let i = 0; i < n; i++) {
    const nextStoneCounts = new Map<number, number>();

    for (const [x, k] of stoneCounts) {
      if (x === 0) {
        const y = 1;
        nextStoneCounts.set(y, (nextStoneCounts.get(y) ?? 0) + k);
        continue;
      }

      const digits = Math.floor(Math.log10(x)) + 1;
      if (digits % 2 === 0) {
        const p = 10 ** (digits / 2);
        const y1 = Math.floor(x / p);
        const y2 = x % p;
        nextStoneCounts.set(y1, (nextStoneCounts.get(y1) ?? 0) + k);
        nextStoneCounts.set(y2, (nextStoneCounts.get(y2) ?? 0) + k);
        continue;
      }

      const y = x * 2024;
      nextStoneCounts.set(y, (nextStoneCounts.get(y) ?? 0) + k);
    }

    stoneCounts = nextStoneCounts;
  }

  return sum(stoneCounts.values());
}

const p1 = solve(25);
const p2 = solve(75);

console.log(p1 === 186424);
console.log(p2 === 219838428124832);
