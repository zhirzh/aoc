import { readFileSync } from "node:fs";
import { Result, test } from "./utils";

const sample = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const input = readFileSync("./d1.txt", "utf8");

test(solve(sample), [3, 6]);
test(solve(input), [1165, null]);

function mod(x: number, n: number) {
  return ((x % n) + n) % n;
}

function solve(input: string): Result {
  const n = 100;
  let dial = 50;

  let ans1 = 0;
  let ans2 = 0;

  input.split("\n").forEach((line) => {
    const dir = line[0];
    const num = Number(line.slice(1));

    const a = dial;
    switch (dir) {
      case "R": {
        dial = mod(dial + num, n);
        break;
      }
      case "L": {
        dial = mod(dial - num, n);
        break;
      }
    }

    if (dial === 0) ans1++;
  });

  return [ans1, ans2];
}
