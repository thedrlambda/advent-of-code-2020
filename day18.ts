import * as fs from "fs";

/*
1 + (2 * 3) + 4
[1]
[1] op=+
{[2] op=},{[1] op=+}
{[2] op=*},{[1] op=+}
{[6] op=},{[1] op=+}
{[7] op=}
*/

function evalLine(line: string) {
  let stack: ((_?: number) => number)[] = [(a) => a!];
  for (let i = 0; i < line.length; i++) {
    let c = line.charAt(i);
    let inner = stack[stack.length - 1];
    if (c === " ") continue;
    else if ("0" <= c && c <= "9") {
      stack[stack.length - 1] = () => inner(+c);
    } else if (c === "+") {
      stack[stack.length - 1] = (a) => inner() + a!;
    } else if (c === "*") {
      stack[stack.length - 1] = (a) => inner() * a!;
    } else if (c === "(") {
      stack.push((a) => a!);
    } else if (c === ")") {
      stack.pop()!;
      let outer = stack[stack.length - 1];
      stack[stack.length - 1] = () => outer(inner());
    }
  }
  return stack[0]();
}

function ex2(line: string) {
  let stack: { add: number; mult: number }[] = [{ add: 0, mult: 1 }];
  for (let i = 0; i < line.length; i++) {
    let c = line.charAt(i);
    let inner = stack[stack.length - 1];
    if (c === " ") continue;
    else if ("0" <= c && c <= "9") {
      stack[stack.length - 1].add += +c;
    } else if (c === "+") {
    } else if (c === "*") {
      stack[stack.length - 1].mult *= stack[stack.length - 1].add;
      stack[stack.length - 1].add = 0;
    } else if (c === "(") {
      stack.push({ add: 0, mult: 1 });
    } else if (c === ")") {
      let inner = stack.pop()!;
      stack[stack.length - 1].add += inner.add * inner.mult;
    }
  }
  return stack[0].add * stack[0].mult;
}

let sum = ("" + fs.readFileSync("ex18.txt"))
  .split("\n")
  .map(ex2)
  .reduce((a, x) => a + x, 0);

console.log("Advent 18.2: ", sum);
