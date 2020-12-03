"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day1_1 = require("../day1");
describe("Exercise 1", function () {
    it("works for given example", function () {
        var input = [1721, 979, 366, 299, 675, 1456];
        var result = day1_1.ex1(input);
        expect(result).toBe(514579);
    });
    it("works for minimal example", function () {
        var input = [2019, 1];
        var result = day1_1.ex1(input);
        expect(result).toBe(2019);
    });
});
