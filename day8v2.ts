import { fix } from "func-tools";
import * as fs from "fs";

let acc = 0;
let loops = (prog: string[]) =>
  fix<boolean, [number]>(true, (loop) => (pc) => {
    if (pc >= prog.length) {
      return false;
    }
    if (prog[pc].startsWith("acc")) {
      acc += +prog[pc].substring("acc ".length);
    }
    if (prog[pc].startsWith("jmp")) {
      return loop(pc + +prog[pc].substring("jmp ".length));
    } else {
      return loop(pc + 1);
    }
  });
let prog = ("" + fs.readFileSync("ex8.txt")).split("\n");
console.log("Advent 8.1: ", loops(prog)(0), acc);
