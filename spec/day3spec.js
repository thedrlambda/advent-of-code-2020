"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day3_1 = require("../day3");
describe("Exercise 1", function () {
    it("works with given example", function () {
        var map = "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#"
            .split("\n")
            .map(function (x) { return x.trim().split(""); });
        expect(day3_1.ex1(map)).toBe(7);
    });
});
describe("Exercise 2", function () {
    it("works with given example", function () {
        var map = "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#"
            .split("\n")
            .map(function (x) { return x.trim().split(""); });
        expect(day3_1.ex2(map)).toBe(336);
    });
});
