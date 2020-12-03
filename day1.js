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
exports.driver = exports.ex2core = exports.ex1core = void 0;
var fs = __importStar(require("fs"));
function ex1core(input) {
    for (var i = 0; i < input.length - 1; i++)
        for (var j = i + 1; j < input.length; j++)
            if (input[i] + input[j] === 2020) {
                return input[i] * input[j];
            }
    return 514579;
}
exports.ex1core = ex1core;
//  i  j  k
// [1, 2, 3]
function ex2core(input) {
    for (var i = 0; i < input.length - 2; i++)
        for (var j = i + 1; j < input.length - 1; j++)
            for (var k = j + 1; k < input.length; k++)
                if (input[i] + input[j] + input[k] === 2020) {
                    return input[i] * input[j] * input[k];
                }
    return 514579;
}
exports.ex2core = ex2core;
function driver(exercise, readFile, output) {
    var content = readFile();
    var input = content.split("\n").map(function (x) { return +x.trim(); });
    output("" + exercise(input));
}
exports.driver = driver;
driver(ex1core, function () { return "" + fs.readFileSync("ex1.txt"); }, function (s) { return console.log(s); });
