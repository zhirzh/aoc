import { readFileSync } from "fs";

const lines = readFileSync(
  import.meta.resolve("./input").replace("file://", ""),
  "utf8"
).split("\n");

const rows = lines.map((line) => line.split(" ").map(Number));

let p1 = 0;
for (const row of rows) {
  if (check(row)) p1++;
}
console.log(p1 === 356);

let p2 = 0;
for (const row of rows) {
  for (let i = 0; i < row.length; i++) {
    const nums = [...row];
    nums.splice(i, 1);
    if (check(nums)) {
      p2++;
      break;
    }
  }
}
console.log(p2 === 413);

function check(nums: number[]) {
  const increasing0 = nums[0] < nums[1];

  for (let i = 1; i < nums.length; i++) {
    const a = nums[i - 1],
      b = nums[i],
      diff = a - b,
      abs = Math.abs(diff);
    const increasing = diff < 0;
    if (abs < 1 || abs > 3 || increasing !== increasing0) {
      return false;
    }
  }

  return true;
}