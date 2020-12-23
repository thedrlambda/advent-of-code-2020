import * as fs from "fs";

let arr = ("" + fs.readFileSync("ex13.txt")).split("\n");
let departureTime = +arr[0];
let busIds = arr[1].split(",");

function ex1(departureTime: number, busIds: string[]) {
  busIds = busIds.filter((x) => x !== "x");
  let i: number;
  let busId: number;
  for (i = 0; ; i++) {
    let tmp = busIds.find((x) => (departureTime + i) % +x === 0);
    if (tmp !== undefined) {
      busId = +tmp;
      break;
    }
  }
  return busId * i;
}

function ex2(busIds: string[]) {
  let i = 0;
  let max = -1;
  busIds.forEach((x, p) => {
    if (+x > max) {
      max = +x;
      i = -p;
    }
  });
  for (; ; i += max) {
    if (busIds.every((x, p) => x === "x" || (i + p) % +x === 0)) break;
  }
  return i;
}

console.log("Advent 13.2: ", ex2(busIds));
