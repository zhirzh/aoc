import { readFileSync } from "node:fs";
import { Result, checkSolve } from "./utils";

const sample = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

const input = readFileSync("./d2.txt", "utf8");

checkSolve(solve(sample), [1227775554, 4174379265]);
checkSolve(solve(input), [34826702005, 43287141963]);

function solve(input: string): Result {
  let ans1 = 0;
  let ans2 = 0;

  input.split(",").forEach((range) => {
    const [start, end] = range.split("-").map(Number);

    for (let idNum = start; idNum <= end; idNum++) {
      const id = idNum.toString();

      if (isRepeating(id, id.length / 2)) ans1 += idNum;

      let invalid = true;
      for (let k = 1; k < id.length / 2 + 1; k++) {
        invalid = isRepeating(id, k);
        if (invalid) break;
      }

      if (invalid) {
        ans2 += idNum;
      }
    }
  });

  return [ans1, ans2];
}

function isRepeating(id: string, k: number) {
  if (id.length === 1) return false;

  const firstChunk = id.slice(0, k);

  for (let i = k; i < id.length; i += k) {
    const chunk = id.slice(i, i + k);

    if (chunk !== firstChunk) return false;
  }

  return true;
}
