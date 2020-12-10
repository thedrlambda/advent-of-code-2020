import * as fs from "fs";

let canContain: { [key: string]: string[] } = {};
function parseLine(line: string) {
  let base = line.substring(0, line.indexOf(" bag"));
  let re = /\d (.+?) bag/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line)) !== null) {
    if (canContain[match[1]] === undefined) canContain[match[1]] = [];
    canContain[match[1]].push(base);
  }
}

function ex1() {
  ("" + fs.readFileSync("ex7.txt")).split("\n").map(parseLine);
  let canHave: string[] = ["shiny gold"];
  for (let i = 0; i < canHave.length; i++) {
    let x = canHave[i];
    canContain[x]?.forEach((b) => {
      if (!canHave.includes(b)) canHave.push(b);
    });
  }
  console.log(canHave.length - 1);
}

let contains: { [key: string]: { count: number; color: string }[] } = {};
function parseLineEx2(line: string) {
  let base = line.substring(0, line.indexOf(" bag"));
  if (contains[base] === undefined) contains[base] = [];
  let re = /(\d) (.+?) bag/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(line)) !== null) {
    contains[base].push({ count: +match[1], color: match[2] });
  }
}

function count(current: string, factor: number): number {
  return contains[current].reduce(
    (a, x) => a + factor * x.count + count(x.color, x.count * factor),
    0
  );
}

function ex2() {
  ("" + fs.readFileSync("ex7.txt")).split("\n").map(parseLineEx2);
  console.log(count("shiny gold", 1));
}

ex2();
