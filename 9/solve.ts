import { readNumbers } from "../utils";

const nums = readNumbers("./9/input", { split: "" });

const blocks: number[] = [];
const holeIdxs: number[] = [];

let diskIdx = 0;
nums.forEach((num, i) => {
  if (i % 2 === 0) {
    const id = i / 2;
    blocks.push(...Array(num).fill(id));
    diskIdx += num;
  } else {
    for (let j = 0; j < num; j++) {
      holeIdxs.push(diskIdx);
      diskIdx++;
    }
  }
});

while (holeIdxs.length > 0) {
  let holeIdx = holeIdxs.shift()!;
  let block = blocks.pop()!;
  blocks.splice(holeIdx, 0, block);
}

let p1 = 0;
blocks.forEach((num, i) => {
  p1 += num * i;
});

console.log(p1 === 6225730762521);
