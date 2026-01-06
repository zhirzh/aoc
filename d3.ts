import { readFileSync } from "node:fs";
import { Result, checkSolve } from "./utils";

const sample = `987654321111111
811111111111119
234234234234278
818181911112111`;

const input = readFileSync("./d3.txt", "utf8");

checkSolve(solve(sample), [357, 3121910778619]);
checkSolve(solve(input), [17095, null]);

function solve(input: string): Result {
  let ans1 = 0;
  let ans2 = 0;

  input.split("\n").forEach((bank) => {
    const nums = bank.split("").map(Number);
    const k1 = maxIndex(nums);
    const k2 =
      k1 === nums.length - 1
        ? maxIndex(nums.slice(0, k1))
        : k1 + 1 + maxIndex(nums.slice(k1 + 1));

    const jolt = k1 < k2 ? 10 * nums[k1] + nums[k2] : 10 * nums[k2] + nums[k1];
    console.log(jolt);
    ans1 += jolt;
  });

  return [ans1, ans2];
}

function maxIndex(nums: number[]) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const max = nums[k];
    if (x > max) k = i;
  }

  return k;
}
