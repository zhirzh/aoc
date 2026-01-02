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
export function test(result: Result, expected: Result) {
  testPart(result, expected, 1);
  testPart(result, expected, 2);
}

function testPart(result: Result, expected: Result, part: 1 | 2) {
  const i = part - 1;
  const e = expected[i];
  const r = result[i];

  if (e === r) console.log(`part ${part}`, true);
  else console.log(`part ${part}`, false, { expected: e, result: r });
}
