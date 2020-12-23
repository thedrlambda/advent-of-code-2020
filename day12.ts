import * as fs from "fs";

function ex1(lines: string[]) {
  let x = 0;
  let y = 0;
  let dx = 10;
  let dy = 1;
  lines.forEach((l) => {
    let num = +l.substring(1);
    if (l.startsWith("E")) {
      dx += num;
    } else if (l.startsWith("W")) {
      dx -= num;
    } else if (l.startsWith("N")) {
      dy += num;
    } else if (l.startsWith("S")) {
      dy -= num;
    } else if (l.startsWith("F")) {
      x += num * dx;
      y += num * dy;
    } else if (l.startsWith("L")) {
      // (0, 1)
      for (; num > 0; num -= 90) {
        let tmp = dx;
        dx = -dy;
        dy = tmp;
      }
      // (-1, 0)
    } else if (l.startsWith("R")) {
      // (-1, 0)
      for (; num > 0; num -= 90) {
        let tmp = dx;
        dx = dy;
        dy = -tmp;
      }
      // (0, 1)
    }
  });
  return Math.abs(x) + Math.abs(y);
}

let arr = ("" + fs.readFileSync("ex12.txt")).split("\n");

console.log("Advent 12.2: ", ex1(arr));
