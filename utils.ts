export const Grid = {
  copy(grid: string[][]): string[][] {
    return grid.map((row) => row.slice());
  },
  parse(text: string): string[][] {
    return text.split("\n").map((line) => line.split(""));
  },
  print(grid: string[][]) {
    grid.forEach((row) => {
      console.log(row.join(" "));
    });
  },
  transpose(grid: string[][]) {
    const R = grid.length;
    const C = grid[0].length;

    const newGrid: string[][] = Array.from({ length: C }, () =>
      Array.from({ length: R })
    );

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        newGrid[c][r] = grid[r][c];
      }
    }

    return newGrid;
  },
};

export function log(depth: number, ...msg: any[]) {
  if (depth === 0) {
    console.log(...msg);
    return;
  }

  const tab = 2;
  const indent = tab * depth - 1;
  console.log(" ".repeat(indent), ...msg);
}

export type Result = [par1: number | null, part2: number | null];
export function checkSolve(result: Result, expected: Result) {
  checkPart(result, expected, 1);
  checkPart(result, expected, 2);
}

function checkPart(result: Result, expected: Result, part: 1 | 2) {
  const i = part - 1;
  const e = expected[i];
  const r = result[i];

  if (e === r) console.log(`part ${part}`, true);
  else console.log(`part ${part}`, false, { result: r, expected: e });
}
