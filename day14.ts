import * as fs from "fs";

function ex1(lines: string[]) {
  let mem: { [key: string]: bigint } = {};
  let posMask: bigint;
  let negMask: bigint;
  lines.forEach((x) => {
    let parts = x.split(" = ");
    if (parts[0] === "mask") {
      posMask = BigInt("0b" + parts[1].replace(/X/g, "0"));
      negMask = BigInt("0b" + parts[1].replace(/X/g, "1"));
    } else {
      let index = parts[0].split(/\[|\]/)[1];
      mem[index] = (BigInt(parts[1]) | posMask) & negMask;
    }
  });
  let sum = Object.values(mem).reduce((a, k) => k + a, BigInt(0));
  return sum;
}

function bruteForce(
  mem: { [key: string]: number },
  mask: string,
  mindex: number,
  pos: string[],
  value: number
) {
  if (mindex >= mask.length) {
    mem[pos.join("")] = value;
  } else if (mask.charAt(mindex) === "1") {
    pos[mindex] = "1";
    bruteForce(mem, mask, mindex + 1, pos, value);
  } else if (mask.charAt(mindex) === "X") {
    pos[mindex] = "0";
    bruteForce(mem, mask, mindex + 1, pos, value);
    pos[mindex] = "1";
    bruteForce(mem, mask, mindex + 1, pos, value);
  } else {
    bruteForce(mem, mask, mindex + 1, pos, value);
  }
}

function ex2(lines: string[]) {
  let mem: { [key: string]: number } = {};
  let mask: string;
  lines.forEach((x) => {
    let parts = x.split(" = ");
    if (parts[0] === "mask") {
      mask = parts[1];
    } else {
      let index = (+parts[0].split(/\[|\]/)[1])
        .toString(2)
        .padStart(36, "0")
        .split("");
      bruteForce(mem, mask, 0, index, +parts[1]);
    }
  });
  let sum = Object.values(mem).reduce((a, k) => BigInt(k) + a, BigInt(0));
  return sum;
}

let arr = ("" + fs.readFileSync("ex14.txt")).split("\n");
console.log("Advent 14.2: ", ex2(arr));
