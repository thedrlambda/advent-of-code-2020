import * as fs from "fs";

function core(sx: number, sy: number, map: string[][]) {
  let x = 0;
  let y = 0;
  let count = 0;
  while (y < map.length) {
    if (map[y][x] === "#") count++;
    x += sx;
    while (x >= map[y].length) x -= map[y].length;
    y += sy;
  }
  return count;
}
export function ex1(map: string[][]) {
  return core(3, 1, map);
}
export function ex2(map: string[][]) {
  return (
    core(1, 1, map) *
    core(3, 1, map) *
    core(5, 1, map) *
    core(7, 1, map) *
    core(1, 2, map)
  );
}

let map = ("" + fs.readFileSync("ex3.txt"))
  .split("\n")
  .map((x) => x.trim().split(""));
console.log(ex2(map));
