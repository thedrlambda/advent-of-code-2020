import * as fs from "fs";

function ex1() {
  let prog = ("" + fs.readFileSync("ex8.txt")).split("\n");
  let acc = 0;
  let pc = 0;
  let visited: number[] = [];
  while (!visited.includes(pc)) {
    visited.push(pc);
    if (prog[pc].startsWith("acc")) {
      acc += +prog[pc].substring("acc ".length);
    }
    if (prog[pc].startsWith("jmp")) {
      pc += +prog[pc].substring("jmp ".length);
    } else {
      pc++;
    }
  }
  console.log(acc);
}

function myEval(prog: string[]) {
  let acc = 0;
  let pc = 0;
  while (pc < prog.length) {
    if (prog[pc].startsWith("acc")) {
      acc += +prog[pc].substring("acc ".length);
    }
    if (prog[pc].startsWith("jmp")) {
      pc += +prog[pc].substring("jmp ".length);
    } else {
      pc++;
    }
  }
  return acc;
}

function loops(prog: string[]) {
  let pc = 0;
  let visited: number[] = [];
  while (pc < prog.length && !visited.includes(pc)) {
    visited.push(pc);
    if (prog[pc].startsWith("jmp")) {
      pc += +prog[pc].substring("jmp ".length);
    } else {
      pc++;
    }
  }
  return pc < prog.length;
}

function ex2() {
  let prog = ("" + fs.readFileSync("ex8.txt")).split("\n");
  let pc = 0;
  let visited: number[] = [];
  let canChange: number[] = [];
  while (!visited.includes(pc)) {
    visited.push(pc);
    if (prog[pc].startsWith("nop")) {
      canChange.push(pc);
    }
    if (prog[pc].startsWith("jmp")) {
      canChange.push(pc);
      pc += +prog[pc].substring("jmp ".length);
    } else {
      pc++;
    }
  }
  for (let i = 0; i < canChange.length; i++) {
    let pos = canChange[i];
    flip(prog, pos);
    if (!loops(prog)) return myEval(prog);
    flip(prog, pos);
  }
}

function flip(prog: string[], pos: number) {
  if (prog[pos].startsWith("nop")) prog[pos] = "jmp" + prog[pos].substring(3);
  else prog[pos] = "nop" + prog[pos].substring(3);
}

ex1();
// console.log(ex2());
