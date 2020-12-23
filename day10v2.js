"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var func_tools_1 = require("func-tools");
var fs = __importStar(require("fs"));
var count = function (arr) {
    return func_tools_1.memorized(function (loop) { return function (n) {
        if (n === 0)
            return 1;
        else if (!arr.includes(n))
            return 0;
        else
            return loop(n - 1) + loop(n - 2) + loop(n - 3);
    }; });
};
var arr = ("" + fs.readFileSync("ex10.txt")).split("\n").map(function (x) { return +x; });
var max = arr.reduce(function (a, x) { return Math.max(a, x); }, -1);
console.log("Advent 10.2: ", count(arr)(max));
