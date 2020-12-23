"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function countNeighbors(board, x, y) {
    var result = 0;
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (x + dx < 0 ||
                y + dy < 0 ||
                x + dx >= board.length ||
                y + dy >= board[x + dx].length)
                continue;
            if (board[x + dx][y + dy] === "#")
                result++;
        }
    }
    return result;
}
function countNeighbors2(board, x, y) {
    var result = 0;
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0)
                continue;
            var ax = x + dx;
            var ay = y + dy;
            while (ax >= 0 &&
                ay >= 0 &&
                ax < board.length &&
                ay < board[ax].length &&
                board[ax][ay] === ".") {
                ax += dx;
                ay += dy;
            }
            if (ax < 0 || ay < 0 || ax >= board.length || ay >= board[ax].length)
                continue;
            if (board[ax][ay] === "#")
                result++;
        }
    }
    return result;
}
function ex1(countNeighbors, board) {
    var occupiedLastTime;
    var occupied;
    do {
        occupiedLastTime = occupied;
        occupied = 0;
        var tmp = [];
        for (var x = 0; x < board.length; x++) {
            tmp.push([]);
            for (var y = 0; y < board[x].length; y++) {
                var adjacent = countNeighbors(board, x, y);
                if (board[x][y] === "#" && adjacent >= 5) {
                    tmp[x][y] = "L";
                }
                else if (board[x][y] === "L" && adjacent === 0) {
                    tmp[x][y] = "#";
                }
                else
                    tmp[x][y] = board[x][y];
                if (tmp[x][y] === "#")
                    occupied++;
            }
        }
        board = tmp;
    } while (occupied !== occupiedLastTime);
    return occupied;
}
var test = "L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL";
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
var arr = ("" + fs.readFileSync("ex11.txt"))
    // let arr = test
    .split("\n")
    .map(function (x) { return x.split(""); });
//console.log("Advent 11: ", ex1(countNeighbors, arr));
console.log("Advent 11.2: ", ex1(countNeighbors2, arr));
