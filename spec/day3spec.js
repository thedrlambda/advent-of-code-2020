"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day3_1 = require("../day3");
it("works with given example", function () {
    var map = "..##.......\n  #...#...#..\n  .#....#..#.\n  ..#.#...#.#\n  .#...##..#.\n  ..#.##.....\n  .#.#.#....#\n  .#........#\n  #.##...#...\n  #...##....#\n  .#..#...#.#"
        .split("\n")
        .map(function (x) { return x.split(""); });
    expect(day3_1.ex1(map)).toBe(7);
});
