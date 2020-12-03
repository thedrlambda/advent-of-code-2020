import { driver, ex1core, ex2core } from "../day1";

describe("Exercise 1 core", () => {
  it("works for given example", () => {
    let input = [1721, 979, 366, 299, 675, 1456];
    let result = ex1core(input);
    expect(result).toBe(514579);
  });

  it("works for minimal example", () => {
    let input = [2019, 1];
    let result = ex1core(input);
    expect(result).toBe(2019);
  });
});

describe("Exercise 1", () => {
  it("works for given example", () => {
    let input = () => "1721\n979\n366\n299\n675\n1456";
    let out = "";
    let output = (s: string) => (out += s);
    driver(ex1core, input, output);
    expect(out).toBe("514579");
  });
});

describe("Exercise 2", () => {
  it("works for given example", () => {
    let input = () => "1721\n979\n366\n299\n675\n1456";
    let out = "";
    let output = (s: string) => (out += s);
    driver(ex2core, input, output);
    expect(out).toBe("241861950");
  });
});

describe("Exercise 2 core", () => {
  it("works for given example", () => {
    let input = [1721, 979, 366, 299, 675, 1456];
    let result = ex2core(input);
    expect(result).toBe(241861950);
  });

  it("works for minimal example", () => {
    let input = [2018, 1, 1];
    let result = ex2core(input);
    expect(result).toBe(2018);
  });
});
