import * as fs from "fs";

function ex1() {
  console.log(
    ("" + fs.readFileSync("ex6.txt"))
      .split(/\n\r?\n|\r\r/)
      .map((x) => [...new Set(x.replace(/\s/g, "").split(""))].length)
      .reduce((a, x) => a + x, 0)
  );
}

function ex2() {
  let sum = 0;
  ("" + fs.readFileSync("ex6.txt")).split(/\n\r?\n|\r\r/).map((x) => {
    let buffer = x.split("\n");
    let result: { [key: string]: number } = {};
    buffer.forEach((line) =>
      line
        .replace(/\s/g, "")
        .split("")
        .forEach((c) => (result[c] = (result[c] || 0) + 1))
    );
    Object.keys(result).forEach((k) => {
      if (result[k] === buffer.length) sum++;
    });
  });
  console.log(sum);
}

ex2();
