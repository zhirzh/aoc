import { readFileSync } from "node:fs";
import { Result, test } from "./utils";

const sample = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const input = readFileSync("./d5.txt", "utf8");

test(solve(sample), [3, 14]);
test(solve(input), [558, 344813017450467]);

function solve(input: string): Result {
  const [freshIdsInput, idsInput] = input.split("\n\n");

  const freshIds = freshIdsInput.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });

  let ans1 = 0;
  let ans2 = 0;

  idsInput
    .split("\n")
    .map(Number)
    .forEach((id) => {
      if (freshIds.some((range) => range.start <= id && id <= range.end)) {
        ans1++;
      }
    });

  freshIds.sort((a, b) => a.start - b.start);

  const ranges: typeof freshIds = [freshIds[0]];
  freshIds.forEach((range) => {
    const lastIdx = ranges.length - 1;
    const prev = ranges[lastIdx];

    if (range.start > prev.end) {
      ranges.push(range);
    } else {
      ranges[lastIdx] = {
        start: prev.start,
        end: Math.max(prev.end, range.end),
      };
    }
  });

  ranges.forEach((range) => {
    ans2 += range.end - range.start + 1;
  });

  return [ans1, ans2];
}
