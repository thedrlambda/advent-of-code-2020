import * as fs from "fs";

function countNeighbors(board: string[][], x: number, y: number) {
  let result = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (
        x + dx < 0 ||
        y + dy < 0 ||
        x + dx >= board.length ||
        y + dy >= board[x + dx].length
      )
        continue;
      if (board[x + dx][y + dy] === "#") result++;
    }
  }
  return result;
}

function countNeighbors2(board: string[][], x: number, y: number) {
  let result = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      let ax = x + dx;
      let ay = y + dy;
      while (
        ax >= 0 &&
        ay >= 0 &&
        ax < board.length &&
        ay < board[ax].length &&
        board[ax][ay] === "."
      ) {
        ax += dx;
        ay += dy;
      }
      if (ax < 0 || ay < 0 || ax >= board.length || ay >= board[ax].length)
        continue;
      if (board[ax][ay] === "#") result++;
    }
  }
  return result;
}

function ex1(
  countNeighbors: (b: string[][], x: number, y: number) => number,
  board: string[][]
) {
  let occupiedLastTime;
  let occupied;
  do {
    occupiedLastTime = occupied;
    occupied = 0;
    let tmp: string[][] = [];
    for (let x = 0; x < board.length; x++) {
      tmp.push([]);
      for (let y = 0; y < board[x].length; y++) {
        let adjacent = countNeighbors(board, x, y);
        if (board[x][y] === "#" && adjacent >= 5) {
          tmp[x][y] = "L";
        } else if (board[x][y] === "L" && adjacent === 0) {
          tmp[x][y] = "#";
        } else tmp[x][y] = board[x][y];
        if (tmp[x][y] === "#") occupied++;
      }
    }
    board = tmp;
  } while (occupied !== occupiedLastTime);
  return occupied;
}

let test = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

/*
let test2 = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`;
console.log(
  countNeighbors2(
    test2.split("\n").map((x) => x.split("")),
    4,
    3
  )
);
*/

let arr = ("" + fs.readFileSync("ex11.txt"))
  // let arr = test
  .split("\n")
  .map((x) => x.split(""));
//console.log("Advent 11: ", ex1(countNeighbors, arr));
console.log("Advent 11.2: ", ex1(countNeighbors2, arr));
