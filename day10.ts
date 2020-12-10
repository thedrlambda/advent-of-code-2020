import * as fs from "fs";

let diffs = [0, 0, 1];
("" + fs.readFileSync("ex10.txt"))
  .split("\n")
  .map((x) => +x)
  .sort((a, b) => a - b)
  .reduce((a, x) => {
    diffs[x - a - 1]++;
    return x;
  }, 0);

function ex1() {
  console.log(diffs[0] * diffs[2]);
}

function foo(arr: number[], index: number, last: number): number {
  if (index >= arr.length) return 1;
  if (last + 3 < arr[index]) return 0;
  else return foo(arr, index + 1, arr[index]) + foo(arr, index + 1, last);
}

function ex2() {
  let arr = ("" + fs.readFileSync("ex10.2.txt"))
    .split("\n")
    .map((x) => +x)
    .sort((a, b) => a - b);
  let sum = 1;
  let section: number[] = [0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] - section[section.length - 1] === 3) {
      let options = Math.max(foo(section, 1, section[0]) / 2, 1);
      console.log(section, options);
      sum *= options;
      section = [];
    }
    section.push(arr[i]);
  }
  let options = Math.max(foo(section, 1, section[0]) / 2, 1);
  console.log(section, options);
  sum *= options;
  console.log(sum);
}

ex2();
