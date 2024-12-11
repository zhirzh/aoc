import { readText } from "../utils";

const text = readText("./3/input");

const r = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;

let p1 = 0;
let p2 = 0;
let enable = true;
while (true) {
  const result = r.exec(text);
  if (!result) break;

  const x = result[0];

  if (x === "do()") {
    enable = true;
    continue;
  }

  if (x === "don't()") {
    enable = false;
    continue;
  }

  const [a, b] = x.match(/\d+/g)!.map(Number);
  p1 += a * b;
  if (enable) p2 += a * b;
}

console.log(p1 === 162813399);
console.log(p2 === 53783319);
