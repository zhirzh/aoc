import { readFileSync } from "node:fs";
import { Grid, Result, test } from "./utils";

const sample = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const input = readFileSync("./d4.txt", "utf8");

test(solve(sample), [13, 43]);
test(solve(input), [1449, 8746]);

function solve(input: string): Result {
  const grid = Grid.parse(input);

  const rollCtrs = newFunction(grid);
  const ans1 = rollCtrs[0];
  const ans2 = rollCtrs.reduce((a, b) => a + b, 0);

  return [ans1, ans2];
}

function newFunction(grid: string[][], rollCtrs: number[] = []) {
  const R = grid.length;
  const C = grid[0].length;
  const N = 1;

  const newGrid = Grid.copy(grid);

  let rollCtr = 0;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const cell = grid[r][c];
      if (cell !== "@") continue;

      let ctr = 0;
      for (let i = -N; i <= N; i++) {
        for (let j = -N; j <= N; j++) {
          const nr = r + i;
          const nc = c + j;

          // const isCenter = i === 0 && j === 0;
          const isCenter = nr === r && nc === c;
          if (isCenter) continue;

          if (!(0 <= nr && nr < R) || !(0 <= nc && nc < C)) continue;
          if (grid[nr][nc] === "@") {
            ctr++;
          }
        }
      }

      if (ctr < 4) {
        rollCtr++;
        newGrid[r][c] = "x";
      }
    }
  }

  if (rollCtr > 0) {
    rollCtrs.push(rollCtr);
    return newFunction(newGrid, rollCtrs);
  }

  return rollCtrs;
}
