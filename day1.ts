import * as fs from "fs";

export function ex1core(input: number[]): number {
  for (let i = 0; i < input.length - 1; i++)
    for (let j = i + 1; j < input.length; j++)
      if (input[i] + input[j] === 2020) {
        return input[i] * input[j];
      }
  return 514579;
}

//  i  j  k
// [1, 2, 3]
export function ex2core(input: number[]): number {
  for (let i = 0; i < input.length - 2; i++)
    for (let j = i + 1; j < input.length - 1; j++)
      for (let k = j + 1; k < input.length; k++)
        if (input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k];
        }
  return 514579;
}

export function driver(
  exercise: (_: number[]) => number,
  readFile: () => string,
  output: (_: string) => void
) {
  let content = readFile();
  let input = content.split("\n").map((x) => +x.trim());
  output("" + exercise(input));
}

driver(
  ex1core,
  () => "" + fs.readFileSync("ex1.txt"),
  (s) => console.log(s)
);
