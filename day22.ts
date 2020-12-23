import * as fs from "fs";

let player = ("" + fs.readFileSync("ex22.txt")).split(/\n\n/).map((x) =>
  x
    .split("\n")
    .slice(1)
    .map((k) => +k)
);

function ex1(p1: number, p2: number, player: number[][]) {
  return p1 > p2;
}

function ex2(p1: number, p2: number, player: number[][]) {
  if (p1 <= player[0].length && p2 <= player[1].length) {
    return playGame(ex2, [player[0].slice(0, p1), player[1].slice(0, p2)]);
  } else {
    return p1 > p2;
  }
}

function arraysEqual<T>(a: T[], b: T[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function playGame(
  ex: (p1: number, p2: number, player: number[][]) => boolean,
  player: number[][]
) {
  let seen: number[][] = [];
  while (player[0].length > 0 && player[1].length > 0) {
    if (seen.some((x) => arraysEqual(x, player[0]))) return true;
    seen.push([...player[0]]);
    let [p1] = player[0].splice(0, 1);
    let [p2] = player[1].splice(0, 1);
    if (ex(p1, p2, player)) {
      player[0].push(p1);
      player[0].push(p2);
    } else {
      player[1].push(p2);
      player[1].push(p1);
    }
  }
  return player[0].length > 0;
}

playGame(ex2, player);
let deck = player[0].length > 0 ? player[0] : player[1];
let sum = 0;
for (let i = 0; i < deck.length; i++) {
  sum += (i + 1) * deck[deck.length - i - 1];
}

console.log("Advent 22.2: ", sum);
