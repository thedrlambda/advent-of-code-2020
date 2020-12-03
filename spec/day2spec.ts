import { ex1core } from "../day2";

describe("Exercise 1 core", () => {
  it("works on given example", () => {
    let input = [
      { policy: { min: 1, max: 3, char: "a" }, password: "abcde" },
      { policy: { min: 1, max: 3, char: "b" }, password: "cdefg" },
      { policy: { min: 2, max: 9, char: "c" }, password: "ccccccccc" },
    ];
    expect(ex1core(input)).toBe(2);
  });

  it("works on another example", () => {
    let input = [{ policy: { min: 3, max: 3, char: "h" }, password: "hhh" }];
    expect(ex1core(input)).toBe(1);
  });
});
