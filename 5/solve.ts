import { readFileSync } from "fs";

const [rulesText, lines] = readFileSync(
  import.meta.resolve("./input").replace("file://", ""),
  "utf8"
).split("\n\n");

const rules = rulesText
  .split("\n")
  .map((line) => line.split("|").map(Number) as [number, number]);

let p1 = 0;
let p2 = 0;

lines.split("\n").forEach((row) => {
  const nums = row.split(",").map(Number);

  const good = rules
    .filter(([a, b]) => nums.includes(a) && nums.includes(b))
    .every(([a, b]) => nums.indexOf(a) <= nums.indexOf(b));

  if (good) {
    const mid = Math.floor(nums.length / 2);
    p1 += nums[mid];
  }

  const sorted = [...nums].sort((x, y) => {
    const rule = rules.find((r) => r.includes(x) && r.includes(y))!;
    return rule.indexOf(x) - rule.indexOf(y);
  });

  if (nums.join() !== sorted.join()) {
    const mid = Math.floor(sorted.length / 2);
    p2 += sorted[mid];
  }
});

console.log(p1 === 6951);
console.log(p2 === 4121);
