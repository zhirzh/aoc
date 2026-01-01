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
