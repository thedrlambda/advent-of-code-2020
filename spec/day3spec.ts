import { ex1, ex2 } from "../day3";

describe("Exercise 1", () => {
  it("works with given example", () => {
    let map = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
      .split("\n")
      .map((x) => x.trim().split(""));
    expect(ex1(map)).toBe(7);
  });
});

describe("Exercise 2", () => {
  it("works with given example", () => {
    let map = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
      .split("\n")
      .map((x) => x.trim().split(""));
    expect(ex2(map)).toBe(336);
  });
});
