import { readFileSync } from "node:fs";
import { Grid, Result, checkSolve } from "./utils";

const sample = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `.trimStart();

const input = readFileSync("./d6.txt", "utf8");

checkSolve(solve(sample), [4277556, 3263827]);
checkSolve(solve(input), [6891729672676, 9770311947567]);

function solve(input: string): Result {
  return [solve1(input), solve2(input)];
}

function solve1(input: string) {
  let ans = 0;

  const grid = input.split("\n").map((line) => line.trim().split(/\s+/g));
  const newGrid = Grid.transpose(grid);

  newGrid.forEach((row) => {
    const op = row.pop();
    const nums = row.map(Number);

    let result = 0;
    switch (op) {
      case "+": {
        result = nums.reduce((a, b) => a + b, 0);
        break;
      }
      case "*": {
        result = nums.reduce((a, b) => a * b, 1);
        break;
      }
    }

    ans += result;
  });

  return ans;
}

function solve2(input: string) {
  let ans = 0;

  const grid = Grid.parse(input);
  const newGrid = Grid.transpose(grid).reverse();

  let nums: number[] = [];
  newGrid.forEach((row) => {
    const op = row.pop();

    const raw = row.join("").trim();
    if (raw === "") return 0;

    const x = Number(raw);
    nums.push(x);

    let result = 0;
    switch (op) {
      case "+": {
        result = nums.reduce((a, b) => a + b, 0);
        nums = [];
        break;
      }
      case "*": {
        result = nums.reduce((a, b) => a * b, 1);
        nums = [];
        break;
      }
    }

    ans += result;
  });

  return ans;
}
