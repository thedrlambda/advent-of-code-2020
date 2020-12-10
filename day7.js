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
var canContain = {};
function parseLine(line) {
    var base = line.substring(0, line.indexOf(" bag"));
    var re = /\d (.+?) bag/g;
    var match;
    while ((match = re.exec(line)) !== null) {
        if (canContain[match[1]] === undefined)
            canContain[match[1]] = [];
        canContain[match[1]].push(base);
    }
}
function ex1() {
    var _a;
    ("" + fs.readFileSync("ex7.txt")).split("\n").map(parseLine);
    var canHave = ["shiny gold"];
    for (var i = 0; i < canHave.length; i++) {
        var x = canHave[i];
        (_a = canContain[x]) === null || _a === void 0 ? void 0 : _a.forEach(function (b) {
            if (!canHave.includes(b))
                canHave.push(b);
        });
    }
    console.log(canHave.length - 1);
}
var contains = {};
function parseLineEx2(line) {
    var base = line.substring(0, line.indexOf(" bag"));
    if (contains[base] === undefined)
        contains[base] = [];
    var re = /(\d) (.+?) bag/g;
    var match;
    while ((match = re.exec(line)) !== null) {
        contains[base].push({ count: +match[1], color: match[2] });
    }
}
function count(current, factor) {
    return contains[current].reduce(function (a, x) { return a + factor * x.count + count(x.color, x.count * factor); }, 0);
}
function ex2() {
    ("" + fs.readFileSync("ex7.txt")).split("\n").map(parseLineEx2);
    console.log(count("shiny gold", 1));
}
ex2();
