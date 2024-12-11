import { readGrid } from "../utils";

const grid = readGrid("./6/input", { split: "\n", colSplit: "" });

const R = grid.length;
const C = grid[0].length;
// console.table(grid);

type Pos = [r: number, c: number];
let pos = [0, 0] as Pos;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] == "^") {
      pos = [r, c];
      break;
    }
  }
}

const visited = new Set<string>();
visited.add(pos.join());

type Dir = "north" | "south" | "east" | "west";
let dir: Dir = "north";

const path = new Set<string>();
path.add(pos.join() + "," + dir);

let i = 0;
while (true) {
  // if (i++ > 100) break;

  let [row, col] = pos;
  switch (dir) {
    case "north":
      row--;
      break;
    case "south":
      row++;
      break;
    case "east":
      col++;
      break;
    case "west":
      col--;
      break;
  }

  const inside = 0 <= row && row < R && 0 <= col && col < C;
  if (!inside) break;

  const tile = grid[row][col];
  if (tile === "#") {
    switch (dir) {
      case "north":
        dir = "east";
        break;
      case "east":
        dir = "south";
        break;
      case "south":
        dir = "west";
        break;
      case "west":
        dir = "north";
        break;
    }

    continue;
  }

  pos = [row, col];
  // console.log(visited.has(pos.join()));
  visited.add(pos.join());
  path.add(pos.join() + "," + dir);
}

const p1 = visited.size;
console.log(p1 === 4967);

visited.forEach((v) => {
  const [oRow, oCol] = v.split(",").map(Number);

  grid[oRow][oCol] = "#";

  grid[oRow][oCol] = ".";
});
