import * as fs from "fs";

export function ex1core(input: number[]): number {
  for (let i = 0; i < input.length - 1; i++)
    for (let j = i + 1; j < input.length; j++)
      if (input[i] + input[j] === 2020) {
        return input[i] * input[j];
      }
  return 514579;
}

export function ex2core(input: number[]): number {
  for (let i = 0; i < input.length - 2; i++)
    for (let j = i + 1; j < input.length - 1; j++)
      for (let k = j + 1; k < input.length; k++)
        if (input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k];
        }
  return 514579;
}

export function ex1(readFile: () => string, output: (_: string) => void) {
  let content = readFile();
  let input = content.split("\n").map((x) => +x.trim());
  output("" + ex1core(input));
}

ex1(
  () => "" + fs.readFileSync("ex1.txt"),
  (s) => console.log(s)
);
