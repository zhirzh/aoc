import { inRange, readNumberGrid } from "../utils";

const grid = readNumberGrid("./10/input");
const R = grid.length;
const C = grid[0].length;

type Point = [r: number, c: number];
type Trail = Point[];

let trails: Trail[] = [];
grid.forEach((row, r) => {
  row.forEach((x, c) => {
    if (x === 0) {
      trails.push([[r, c]]);
    }
  });
});

for (let i = 1; i < 10; i++) {
  const nextTrails: Trail[] = [];

  trails.forEach((trail) => {
    const last = trail[trail.length - 1];
    const [r, c] = last;

    const around = [
      [r - 1, c],
      [r, c - 1],
      [r, c + 1],
      [r + 1, c],
    ];

    around.forEach(([ar, ac]) => {
      if (!inRange(ar, 0, R) || !inRange(ac, 0, C)) return;
      const y = grid[ar][ac];
      if (y === i) {
        nextTrails.push([...trail, [ar, ac]]);
      }
    });
  });

  trails = nextTrails;
}

const uniqueTrails: [first: Point, last: Point][] = [];

trails.forEach((trail) => {
  const first = trail[0];
  const last = trail[trail.length - 1];
  const exists = uniqueTrails.some((other) => {
    const [otherFirst, otherLast] = other;
    return (
      first[0] === otherFirst[0] &&
      first[1] === otherFirst[1] &&
      last[0] === otherLast[0] &&
      last[1] === otherLast[1]
    );
  });
  if (!exists) {
    uniqueTrails.push([first, last]);
  }
});

const p1 = uniqueTrails.length;
const p2 = trails.length;

console.log(p1 === 776);
console.log(p2 === 1657);
