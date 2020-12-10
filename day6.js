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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function ex1() {
    console.log(("" + fs.readFileSync("ex6.txt"))
        .split(/\n\r?\n|\r\r/)
        .map(function (x) { return __spread(new Set(x.replace(/\s/g, "").split(""))).length; })
        .reduce(function (a, x) { return a + x; }, 0));
}
function ex2() {
    var sum = 0;
    ("" + fs.readFileSync("ex6.txt")).split(/\n\r?\n|\r\r/).map(function (x) {
        var buffer = x.split("\n");
        var result = {};
        buffer.forEach(function (line) {
            return line
                .replace(/\s/g, "")
                .split("")
                .forEach(function (c) { return (result[c] = (result[c] || 0) + 1); });
        });
        Object.keys(result).forEach(function (k) {
            if (result[k] === buffer.length)
                sum++;
        });
    });
    console.log(sum);
}
ex2();
