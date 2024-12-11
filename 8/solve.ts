import { inRange, readGrid } from "../utils";

const grid = readGrid("./8/input", { split: "\n", colSplit: "" });

const R = grid.length;
const C = grid[0].length;

const map = new Map<string, [r: number, c: number][]>();

for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    const tile = grid[r][c];
    if (tile === ".") continue;
    const points = map.get(tile) ?? [];
    map.set(tile, [...points, [r, c]]);
  }
}

let p1 = 0;
map.forEach((points) => {
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;

      const a = points[i];
      const b = points[j];

      const d = [a[0] - b[0], a[1] - b[1]];
      const x = [a[0] + d[0], a[1] + d[1]];

      if (
        inRange(x[0], 0, R) &&
        inRange(x[1], 0, C) &&
        grid[x[0]][x[1]] === "."
      ) {
        p1++;
      }
    }
  }
});

let p2 = 0;
const seen = new Set<string>();
map.forEach((points) => {
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;

      const a = points[i];
      const b = points[j];

      const d = [a[0] - b[0], a[1] - b[1]];

      let x = [a[0], a[1]];
      while (true) {
        x = [x[0] + d[0], x[1] + d[1]];
        if (!inRange(x[0], 0, R) || !inRange(x[1], 0, C)) break;
        if (seen.has(x.join())) continue;
        p2++;
        seen.add(x.join());
      }

      let y = [a[0], a[1]];
      while (true) {
        y = [y[0] - d[0], y[1] - d[1]];
        if (!inRange(y[0], 0, R) || !inRange(y[1], 0, C)) break;
        if (seen.has(y.join())) continue;
        p2++;
        seen.add(y.join());
      }
    }
  }
});

console.log(p1 === 222);
console.log(p2 === 884);
