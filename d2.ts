import { readFileSync } from "node:fs";
import { Result, test } from "./utils";

const sample = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

const input = readFileSync("./d2.txt", "utf8");

test(solve(sample), [1227775554, 4174379265]);
test(solve(input), [34826702005, null]);

function solve(input: string): Result {
  let ans1 = 0;
  let ans2 = 0;

  input.split(",").forEach((range) => {
    const [start, end] = range.split("-").map(Number);

    for (let x = start; x <= end; x++) {
      const y = x.toString();

      const isEvenLength = y.length % 2 === 0;
      if (!isEvenLength) continue;

      const k = y.length / 2;
      const isRepeating = y.slice(0, k) === y.slice(k);
      if (!isRepeating) continue;

      ans1 += x;
    }
  });

  return [ans1, ans2];
}
