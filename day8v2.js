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
var acc = 0;
var loops = function (prog) {
    return func_tools_1.fix(true, function (loop) { return function (pc) {
        if (pc >= prog.length) {
            return false;
        }
        if (prog[pc].startsWith("acc")) {
            acc += +prog[pc].substring("acc ".length);
        }
        if (prog[pc].startsWith("jmp")) {
            return loop(pc + +prog[pc].substring("jmp ".length));
        }
        else {
            return loop(pc + 1);
        }
    }; });
};
var prog = ("" + fs.readFileSync("ex8.txt")).split("\n");
console.log("Advent 8.1: ", loops(prog)(0), acc);
