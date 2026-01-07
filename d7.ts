import { readFileSync } from "node:fs";
import { Grid, Result, checkSolve } from "./utils";

const sample = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`.trim();

const input = readFileSync("./d7.txt", "utf8");

checkSolve(solve(sample), [21, 40]);
checkSolve(solve(input), [1490, 3806264447357]);

function solve(input: string): Result {
  let ans1 = 0;
  let ans2 = 0;

  const grid = Grid.parse(input);
  const R = grid.length;
  const C = grid[0].length;

  const start = grid[0].indexOf("S");

  let beam = Array(C).fill(0); // number of beams in each col of a row
  beam[start] = 1;

  for (let r = 2; r < R; r++) {
    const row = grid[r];

    let splitCtr = 0;
    const newBeam = Array(C).fill(0);
    for (let c = 0; c < C; c++) {
      if (beam[c] === 0) continue;

      if (row[c] === "^") {
        splitCtr++;
        // console.log("split @", c, [c - 1, c + 1]);
        newBeam[c - 1] += beam[c];
        newBeam[c + 1] += beam[c];
      } else {
        // console.log("pass @", c);
        newBeam[c] += beam[c];
      }
    }

    beam = newBeam;
    ans1 += splitCtr;
  }

  ans2 = beam.reduce((a, b) => a + b, 0);

  return [ans1, ans2];
}
