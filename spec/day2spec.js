"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var day2_1 = require("../day2");
it("works on given example", function () {
    var input = [
        { policy: { min: 1, max: 3, char: "a" }, password: "abcde" },
        { policy: { min: 1, max: 3, char: "b" }, password: "abcde" },
        { policy: { min: 2, max: 9, char: "c" }, password: "ccccccccc" },
    ];
    expect(day2_1.ex1(input)).toBe(2);
});
