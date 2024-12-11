import { readLines } from "../utils";

const rows = readLines("./4/input");

const totalRows = rows.length;
const totalCols = rows[0].length;

let p1 = 0;

// horizontal
for (let r = 0; r < totalRows; r++) {
  for (let c = 0; c < totalCols - 3; c++) {
    const word = rows[r].slice(c, c + 4);
    if (word === "XMAS" || word === "SAMX") p1++;
  }
}

// vertical
for (let c = 0; c < totalCols; c++) {
  for (let r = 0; r < totalRows - 3; r++) {
    const word = rows[r][c] + rows[r + 1][c] + rows[r + 2][c] + rows[r + 3][c];
    if (word === "XMAS" || word === "SAMX") p1++;
  }
}

// diagonal
for (let r = 0; r < totalRows - 3; r++) {
  for (let c = 0; c < totalCols - 3; c++) {
    const left =
      rows[r][c] + rows[r + 1][c + 1] + rows[r + 2][c + 2] + rows[r + 3][c + 3];
    if (left === "XMAS" || left === "SAMX") p1++;

    const right =
      rows[r][c + 3] + rows[r + 1][c + 2] + rows[r + 2][c + 1] + rows[r + 3][c];
    if (right === "XMAS" || right === "SAMX") p1++;
  }
}

console.log(p1 === 2642);

let p2 = 0;

// x-mas
for (let r = 0; r < totalRows - 2; r++) {
  for (let c = 0; c < totalCols - 2; c++) {
    const left = rows[r][c] + rows[r + 1][c + 1] + rows[r + 2][c + 2];
    const right = rows[r][c + 2] + rows[r + 1][c + 1] + rows[r + 2][c];
    if (
      (left === "MAS" || left === "SAM") &&
      (right === "MAS" || right === "SAM")
    )
      p2++;
  }
}

console.log(p2 === 1974);
