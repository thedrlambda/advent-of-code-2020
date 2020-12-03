"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day2_1 = require("../day2");
describe("Exercise 1 core", function () {
    it("works on given example", function () {
        var input = [
            { policy: { min: 1, max: 3, char: "a" }, password: "abcde" },
            { policy: { min: 1, max: 3, char: "b" }, password: "cdefg" },
            { policy: { min: 2, max: 9, char: "c" }, password: "ccccccccc" },
        ];
        expect(day2_1.ex1core(input)).toBe(2);
    });
    it("works on another example", function () {
        var input = [{ policy: { min: 3, max: 3, char: "h" }, password: "hhh" }];
        expect(day2_1.ex1core(input)).toBe(1);
    });
});
