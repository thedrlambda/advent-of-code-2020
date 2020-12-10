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
function hasSum(arr, e) {
    for (var i = 0; i < arr.length; i++)
        for (var j = i + 1; j < arr.length; j++)
            if (arr[i] + arr[j] === e)
                return true;
    return false;
}
function ex1() {
    var lines = ("" + fs.readFileSync("ex9.txt")).split("\n").map(function (x) { return +x; });
    var last25 = [];
    var i = 0;
    for (; i < 25; i++)
        last25.push(lines[i]);
    for (; i < lines.length; i++) {
        if (!hasSum(last25, lines[i]))
            return lines[i];
        last25.push(lines[i]);
        last25.splice(0, 1);
    }
}
function ex2() {
    var lines = ("" + fs.readFileSync("ex9.txt")).split("\n").map(function (x) { return +x; });
    var start = 0;
    var end = 0;
    var total = lines[0];
    var target = 1124361034;
    while (total !== target) {
        while (total < target) {
            end++;
            total += lines[end];
        }
        while (total > target) {
            total -= lines[start];
            start++;
        }
    }
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    for (var i = start; i < end; i++) {
        if (min > lines[i])
            min = lines[i];
        if (max < lines[i])
            max = lines[i];
    }
    return min + max;
}
console.log(ex2());
