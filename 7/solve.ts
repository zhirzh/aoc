import { readLines } from "../utils";

const lines = readLines("./7/input");

const ops = ["+", "*", "|"];

let p1 = 0;
let p2 = 0;
lines.forEach((line) => {
  const [x, ...nums] = line.split(/[:\s]+/).map(Number);

  if (calc(nums, false).includes(x)) p1 += x;
  if (calc(nums, true).includes(x)) p2 += x;
});

console.log(p1 === 1611660863222);
console.log(p2 === 945341732469724);

function calc(nums: number[], concat: boolean) {
  return nums.reduce<number[]>((parts, x) => {
    if (parts.length === 0) return [x];

    const nextParts: number[] = [];

    parts.forEach((p) => {
      ops.forEach((op) => {
        let y!: number;
        if (op === "+") y = p + x;
        if (op === "*") y = p * x;
        if (concat && op === "|") y = Number(`${p}${x}`);
        nextParts.push(y);
      });
    });

    return nextParts;
  }, []);
}
