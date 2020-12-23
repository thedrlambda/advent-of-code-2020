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
function ex1(lines) {
    var mem = {};
    var posMask;
    var negMask;
    lines.forEach(function (x) {
        var parts = x.split(" = ");
        if (parts[0] === "mask") {
            posMask = BigInt("0b" + parts[1].replace(/X/g, "0"));
            negMask = BigInt("0b" + parts[1].replace(/X/g, "1"));
        }
        else {
            var index = parts[0].split(/\[|\]/)[1];
            mem[index] = (BigInt(parts[1]) | posMask) & negMask;
        }
    });
    var sum = Object.values(mem).reduce(function (a, k) { return k + a; }, BigInt(0));
    return sum;
}
function bruteForce(mem, mask, mindex, pos, value) {
    if (mindex >= mask.length) {
        mem[pos.join("")] = value;
    }
    else if (mask.charAt(mindex) === "1") {
        pos[mindex] = "1";
        bruteForce(mem, mask, mindex + 1, pos, value);
    }
    else if (mask.charAt(mindex) === "X") {
        pos[mindex] = "0";
        bruteForce(mem, mask, mindex + 1, pos, value);
        pos[mindex] = "1";
        bruteForce(mem, mask, mindex + 1, pos, value);
    }
    else {
        bruteForce(mem, mask, mindex + 1, pos, value);
    }
}
function ex2(lines) {
    var mem = {};
    var mask;
    lines.forEach(function (x) {
        var parts = x.split(" = ");
        if (parts[0] === "mask") {
            mask = parts[1];
        }
        else {
            var index = (+parts[0].split(/\[|\]/)[1])
                .toString(2)
                .padStart(36, "0")
                .split("");
            bruteForce(mem, mask, 0, index, +parts[1]);
        }
    });
    var sum = Object.values(mem).reduce(function (a, k) { return BigInt(k) + a; }, BigInt(0));
    return sum;
}
var arr = ("" + fs.readFileSync("ex14.txt")).split("\n");
console.log("Advent 14.2: ", ex2(arr));
