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
var fs = __importStar(require("fs"));
function parse(input) {
    input = input.trim();
    var row = Number.parseInt(input.substring(0, 7).replace(/B/g, "1").replace(/F/g, "0"), 2);
    var col = Number.parseInt(input.substring(7).replace(/R/g, "1").replace(/L/g, "0"), 2);
    return row * 8 + col;
}
function parse2(input) {
    return Number.parseInt(input
        .trim()
        .replace(/B/g, "1")
        .replace(/F/g, "0")
        .replace(/R/g, "1")
        .replace(/L/g, "0"), 2);
}
function ex1() {
    return ("" + fs.readFileSync("ex5.txt"))
        .split("\n")
        .map(parse)
        .reduce(function (a, x) { return (x > a ? x : a); }, -1);
}
function ex2() {
    return (("" + fs.readFileSync("ex5.txt"))
        .split("\n")
        .map(parse2)
        .sort()
        .reduce(function (a, x) { return (x === a + 1 ? x : a); }, 100) + 1);
}
console.log(ex2());
