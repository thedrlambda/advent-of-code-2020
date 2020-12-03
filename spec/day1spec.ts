import { ex1 } from "../day1";

describe("Exercise 1", () => {
  it("works for given example", () => {
    let input = [1721, 979, 366, 299, 675, 1456];
    let result = ex1(input);
    expect(result).toBe(514579);
  });

  it("works for minimal example", () => {
    let input = [2019, 1];
    let result = ex1(input);
    expect(result).toBe(2019);
  });
});
