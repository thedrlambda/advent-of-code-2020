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
function ex1() {
    var prog = ("" + fs.readFileSync("ex8.txt")).split("\n");
    var acc = 0;
    var pc = 0;
    var visited = [];
    while (!visited.includes(pc)) {
        visited.push(pc);
        if (prog[pc].startsWith("acc")) {
            acc += +prog[pc].substring("acc ".length);
        }
        if (prog[pc].startsWith("jmp")) {
            pc += +prog[pc].substring("jmp ".length);
        }
        else {
            pc++;
        }
    }
    console.log(acc);
}
function myEval(prog) {
    var acc = 0;
    var pc = 0;
    while (pc < prog.length) {
        if (prog[pc].startsWith("acc")) {
            acc += +prog[pc].substring("acc ".length);
        }
        if (prog[pc].startsWith("jmp")) {
            pc += +prog[pc].substring("jmp ".length);
        }
        else {
            pc++;
        }
    }
    return acc;
}
function loops(prog) {
    var pc = 0;
    var visited = [];
    while (pc < prog.length && !visited.includes(pc)) {
        visited.push(pc);
        if (prog[pc].startsWith("jmp")) {
            pc += +prog[pc].substring("jmp ".length);
        }
        else {
            pc++;
        }
    }
    return pc < prog.length;
}
function ex2() {
    var prog = ("" + fs.readFileSync("ex8.txt")).split("\n");
    var pc = 0;
    var visited = [];
    var canChange = [];
    while (!visited.includes(pc)) {
        visited.push(pc);
        if (prog[pc].startsWith("nop")) {
            canChange.push(pc);
        }
        if (prog[pc].startsWith("jmp")) {
            canChange.push(pc);
            pc += +prog[pc].substring("jmp ".length);
        }
        else {
            pc++;
        }
    }
    for (var i = 0; i < canChange.length; i++) {
        var pos = canChange[i];
        flip(prog, pos);
        if (!loops(prog))
            return myEval(prog);
        flip(prog, pos);
    }
}
function flip(prog, pos) {
    if (prog[pos].startsWith("nop"))
        prog[pos] = "jmp" + prog[pos].substring(3);
    else
        prog[pos] = "nop" + prog[pos].substring(3);
}
console.log(ex2());
