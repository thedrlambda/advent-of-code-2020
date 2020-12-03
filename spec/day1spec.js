"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day1_1 = require("../day1");
describe("Exercise 1 core", function () {
    it("works for given example", function () {
        var input = [1721, 979, 366, 299, 675, 1456];
        var result = day1_1.ex1core(input);
        expect(result).toBe(514579);
    });
    it("works for minimal example", function () {
        var input = [2019, 1];
        var result = day1_1.ex1core(input);
        expect(result).toBe(2019);
    });
});
describe("Exercise 1", function () {
    it("works for given example", function () {
        var input = function () { return "1721\n979\n366\n299\n675\n1456"; };
        var out = "";
        var output = function (s) { return (out += s); };
        day1_1.driver(day1_1.ex1core, input, output);
        expect(out).toBe("514579");
    });
});
describe("Exercise 2", function () {
    it("works for given example", function () {
        var input = function () { return "1721\n979\n366\n299\n675\n1456"; };
        var out = "";
        var output = function (s) { return (out += s); };
        day1_1.driver(day1_1.ex2core, input, output);
        expect(out).toBe("241861950");
    });
});
describe("Exercise 2 core", function () {
    it("works for given example", function () {
        var input = [1721, 979, 366, 299, 675, 1456];
        var result = day1_1.ex2core(input);
        expect(result).toBe(241861950);
    });
    it("works for minimal example", function () {
        var input = [2018, 1, 1];
        var result = day1_1.ex2core(input);
        expect(result).toBe(2018);
    });
});
