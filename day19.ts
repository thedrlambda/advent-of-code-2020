import * as fs from "fs";

/*
0: 1 2
1: 3 4
2: "b"
4: "a"
3: 5 | 6
5: 4 | 4 5
6: 2
(a* | b) a | b

aaab

*/

enum Type {
  Conj,
  Disj,
  Symbol,
}

type Rule =
  | { type: Type.Symbol; symbol: string }
  | { type: Type.Conj; elems: string[] }
  | { type: Type.Disj; left: Rule; right: Rule };

let rules: { [key: string]: Rule } = {};

function assertExhausted(x: never): never {
  throw new Error("Unexpected object: " + x);
}
function matches<T>(
  str: string,
  index: number,
  rule: Rule,
  succ: (i: number, fail: () => T) => T,
  fail: () => T
): T {
  if (index >= str.length) return fail();
  if (rule.type === Type.Symbol) {
    if (rule.symbol === str.charAt(index)) {
      return succ(index + 1, fail);
    } else {
      return fail();
    }
  } else if (rule.type === Type.Conj) {
    let k = succ;
    for (let i = rule.elems.length - 1; i >= 0; i--) {
      let r = rules[rule.elems[i]];
      let tmp = (k: (p: number, fail: () => T) => T) => (
        p: number,
        f: () => T
      ) => {
        return matches(str, p, r, k, f);
      };
      let tmp2 = tmp(k);
      k = tmp2;
    }
    return k(index, fail);
  } else if (rule.type === Type.Disj) {
    return matches(str, index, rule.left, succ, () => {
      return matches(str, index, rule.right, succ, fail);
    });
  } else {
    assertExhausted(rule);
  }
}

function parseRule(line: string) {
  let parts = line.trim().split(": ");
  let ruleParts = parts[1].split(" | ");
  if (ruleParts.length > 1) {
    rules[parts[0]] = {
      type: Type.Disj,
      left: { type: Type.Conj, elems: ruleParts[0].split(" ").map((x) => x) },
      right: { type: Type.Conj, elems: ruleParts[1].split(" ").map((x) => x) },
    };
  } else {
    if (parts[1].includes('"')) {
      rules[parts[0]] = { type: Type.Symbol, symbol: ruleParts[0].charAt(1) };
    } else {
      let ruleParts = parts[1].split(" ");
      rules[parts[0]] = { type: Type.Conj, elems: ruleParts.map((x) => x) };
    }
  }
}

let file = ("" + fs.readFileSync("ex19.txt")).split(/\n\r?\n|\r\r/);
file[0]
  .split("\n")
  .map((x) => x.trim())
  .forEach(parseRule);
rules["8"] = {
  type: Type.Disj,
  left: { type: Type.Conj, elems: ["42", "8"] },
  right: { type: Type.Conj, elems: ["42"] },
};
rules["11"] = {
  type: Type.Disj,
  left: { type: Type.Conj, elems: ["42", "11", "31"] },
  right: { type: Type.Conj, elems: ["42", "31"] },
};
// console.log(rules);
let valid = file[1]
  .split("\n")
  .map((x) => x.trim())
  .map((line) =>
    matches(
      line,
      0,
      rules["0"],
      (i, fail) => {
        if (line.length !== i) return fail();
        else return true;
      },
      () => false
    )
  )
  .filter((x) => x).length;

console.log("Advent 19.2: ", valid);
