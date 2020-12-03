import * as fs from "fs";

interface Config {
  policy: { min: number; max: number; char: string };
  password: string;
}

function isValidExercise1(conf: Config) {
  let count = 0;
  for (let i = 0; i < conf.password.length; i++) {
    if (conf.password.charAt(i) === conf.policy.char) {
      count++;
    }
  }
  return conf.policy.min <= count && count <= conf.policy.max;
}

function xor(a: boolean, b: boolean) {
  return (a && !b) || (!a && b);
}

function isValidExercise2(conf: Config) {
  return xor(
    conf.password.charAt(conf.policy.min) === conf.policy.char,
    conf.password.charAt(conf.policy.max) === conf.policy.char
  );
}

function core(validator: (_: Config) => boolean, input: Config[]) {
  let valid = 0;
  for (let i = 0; i < input.length; i++)
    if (validator(input[i])) {
      valid++;
    }
  return valid;
}
export function ex1(input: Config[]) {
  return core(isValidExercise1, input);
}
export function ex2(input: Config[]) {
  return core(isValidExercise2, input);
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
  output("" + core(isValidExercise1, input));
}

driver(
  () => "" + fs.readFileSync("ex2.txt"),
  (s) => console.log(s)
);
