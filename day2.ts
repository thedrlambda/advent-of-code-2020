import * as fs from "fs";

function isValid(conf: {
  policy: { min: number; max: number; char: string };
  password: string;
}) {
  let count = 0;
  for (let i = 0; i < conf.password.length; i++) {
    if (conf.password.charAt(i) === conf.policy.char) {
      count++;
    }
  }
  return conf.policy.min <= count && count <= conf.policy.max;
}

export function ex1core(
  input: {
    policy: { min: number; max: number; char: string };
    password: string;
  }[]
) {
  let valid = 0;
  for (let i = 0; i < input.length; i++)
    if (isValid(input[i])) {
      valid++;
    }
  return valid;
}

function parse(line: string) {
  let parts = line.split(": ");
  let policyParts = parts[0].split(" ");
  let rangeParts = policyParts[0].split("-");
  return {
    policy: { min: +rangeParts[0], max: +rangeParts[1], char: policyParts[1] },
    password: parts[1],
  };
}

export function driver(readFile: () => string, output: (_: string) => void) {
  let content = readFile();
  let input = content.split("\n").map(parse);
  output("" + ex1core(input));
}

driver(
  () => "" + fs.readFileSync("ex2.txt"),
  (s) => console.log(s)
);
