import { ex1 } from "../day2";

it("works on given example", () => {
  let input = [
    { policy: { min: 1, max: 3, char: "a" }, password: "abcde" },
    { policy: { min: 1, max: 3, char: "b" }, password: "abcde" },
    { policy: { min: 2, max: 9, char: "c" }, password: "ccccccccc" },
  ];
  expect(ex1(input)).toBe(2);
});
