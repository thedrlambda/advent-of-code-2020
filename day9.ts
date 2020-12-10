import * as fs from "fs";

function hasSum(arr: number[], e: number) {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] + arr[j] === e) return true;
  return false;
}

function ex1() {
  let lines = ("" + fs.readFileSync("ex9.txt")).split("\n").map((x) => +x);
  let last25 = [];
  let i = 0;
  for (; i < 25; i++) last25.push(lines[i]);
  for (; i < lines.length; i++) {
    if (!hasSum(last25, lines[i])) return lines[i];
    last25.push(lines[i]);
    last25.splice(0, 1);
  }
}

function ex2() {
  let lines = ("" + fs.readFileSync("ex9.txt")).split("\n").map((x) => +x);
  let start = 0;
  let end = 0;
  let total = lines[0];
  let target = 1124361034;
  while (total !== target) {
    while (total < target) {
      end++;
      total += lines[end];
    }
    while (total > target) {
      total -= lines[start];
      start++;
    }
  }
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (let i = start; i < end; i++) {
    if (min > lines[i]) min = lines[i];
    if (max < lines[i]) max = lines[i];
  }

  return min + max;
}

console.log(ex2());
