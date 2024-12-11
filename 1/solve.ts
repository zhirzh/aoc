import { readNumberGrid } from "../utils";

const grid = readNumberGrid("./1/input", { split: "\n", colSplit: "   " });

const xs: number[] = [];
const ys: number[] = [];
const counts = new Map<number, number>();

grid.forEach(([x, y]) => {
  xs.push(x);
  ys.push(y);
  counts.set(y, (counts.get(y) ?? 0) + 1);
});

xs.sort((a, b) => a - b);
ys.sort((a, b) => a - b);

let p1 = 0;
for (let i = 0; i < xs.length; i++) {
  p1 += Math.abs(xs[i] - ys[i]);
}

console.log(p1 === 2113135);

let p2 = 0;
xs.forEach((x) => {
  const count = counts.get(x) ?? 0;
  p2 += x * count;
});

console.log(p2 === 19097157);
