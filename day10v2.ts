import { memorized } from "func-tools";
import * as fs from "fs";

let count = (arr: number[]) =>
  memorized<number, [number]>((loop) => (n) => {
    if (n === 0) return 1;
    else if (!arr.includes(n)) return 0;
    else return loop(n - 1) + loop(n - 2) + loop(n - 3);
  });

let arr = ("" + fs.readFileSync("ex10.txt")).split("\n").map((x) => +x);
let max = arr.reduce((a, x) => Math.max(a, x), -1);
console.log("Advent 10.2: ", count(arr)(max));
