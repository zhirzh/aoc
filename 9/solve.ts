import { readNumbers } from "../utils";

const nums = readNumbers("./9/input", { split: "" });

const blockIds: number[] = [];
const holeIdxs: number[] = [];

const blocks: [pos: number, size: number, id: number][] = [];
const holes: [pos: number, size: number][] = [];
const disk: (number | ".")[] = [];

nums.forEach((num, i) => {
  if (i % 2 === 0) {
    const id = i / 2;
    blockIds.push(...Array(num).fill(id));
    blocks.push([disk.length, num, id]);
    disk.push(...Array(num).fill(id));
  } else {
    for (let j = 0; j < num; j++) {
      holeIdxs.push(disk.length + j);
    }
    holes.push([disk.length, num]);
    disk.push(...Array(num).fill("."));
  }
});

while (holeIdxs.length > 0) {
  const holeIdx = holeIdxs.shift()!;
  const blockId = blockIds.pop()!;
  blockIds.splice(holeIdx, 0, blockId);
}

let p1 = 0;
blockIds.forEach((id, i) => {
  p1 += id * i;
});

console.log(p1 === 6225730762521);

while (true) {
  const block = blocks.pop();
  if (!block) break;

  for (const hole of holes) {
    if (hole[0] > block[0]) break;

    if (hole[1] < block[1]) continue;

    for (let i = 0; i < block[1]; i++) {
      disk[hole[0] + i] = block[2];
      disk[block[0] + i] = ".";
    }
    hole[0] += block[1];
    hole[1] -= block[1];
    if (hole[1] === 0) holes.splice(holes.indexOf(hole), 1);

    break;
  }
}

let p2 = 0;
disk.forEach((id, i) => {
  if (id === ".") return;
  p2 += id * i;
});

console.log(p2 === 6250605700557);
