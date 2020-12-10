import * as fs from "fs";

function parse(input: string) {
  input = input.trim();
  let row = Number.parseInt(
    input.substring(0, 7).replace(/B/g, "1").replace(/F/g, "0"),
    2
  );
  let col = Number.parseInt(
    input.substring(7).replace(/R/g, "1").replace(/L/g, "0"),
    2
  );
  return row * 8 + col;
}

function parse2(input: string) {
  return Number.parseInt(
    input
      .trim()
      .replace(/B/g, "1")
      .replace(/F/g, "0")
      .replace(/R/g, "1")
      .replace(/L/g, "0"),
    2
  );
}

function ex1() {
  return ("" + fs.readFileSync("ex5.txt"))
    .split("\n")
    .map(parse)
    .reduce((a, x) => (x > a ? x : a), -1);
}

function ex2() {
  return (
    ("" + fs.readFileSync("ex5.txt"))
      .split("\n")
      .map(parse2)
      .sort()
      .reduce((a, x) => (x === a + 1 ? x : a), 100) + 1
  );
}

console.log(ex2());
