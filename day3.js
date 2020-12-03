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
exports.ex2 = exports.ex1 = void 0;
var fs = __importStar(require("fs"));
function core(sx, sy, map) {
    var x = 0;
    var y = 0;
    var count = 0;
    while (y < map.length) {
        if (map[y][x] === "#")
            count++;
        x += sx;
        while (x >= map[y].length)
            x -= map[y].length;
        y += sy;
    }
    return count;
}
function ex1(map) {
    return core(3, 1, map);
}
exports.ex1 = ex1;
function ex2(map) {
    return (core(1, 1, map) *
        core(3, 1, map) *
        core(5, 1, map) *
        core(7, 1, map) *
        core(1, 2, map));
}
exports.ex2 = ex2;
var map = ("" + fs.readFileSync("ex3.txt"))
    .split("\n")
    .map(function (x) { return x.trim().split(""); });
console.log(ex2(map));
