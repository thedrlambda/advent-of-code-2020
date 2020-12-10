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
var diffs = [0, 0, 1];
("" + fs.readFileSync("ex10.txt"))
    .split("\n")
    .map(function (x) { return +x; })
    .sort(function (a, b) { return a - b; })
    .reduce(function (a, x) {
    diffs[x - a - 1]++;
    return x;
}, 0);
function ex1() {
    console.log(diffs[0] * diffs[2]);
}
function foo(arr, index, last) {
    if (index >= arr.length)
        return 1;
    if (last + 3 < arr[index])
        return 0;
    else
        return foo(arr, index + 1, arr[index]) + foo(arr, index + 1, last);
}
function ex2() {
    var arr = ("" + fs.readFileSync("ex10.2.txt"))
        .split("\n")
        .map(function (x) { return +x; })
        .sort(function (a, b) { return a - b; });
    var sum = 1;
    var section = [0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] - section[section.length - 1] === 3) {
            var options_1 = Math.max(foo(section, 1, section[0]) / 2, 1);
            console.log(section, options_1);
            sum *= options_1;
            section = [];
        }
        section.push(arr[i]);
    }
    var options = Math.max(foo(section, 1, section[0]) / 2, 1);
    console.log(section, options);
    sum *= options;
    console.log(sum);
}
ex2();
