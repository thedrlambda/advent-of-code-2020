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
    var x = 0;
    var y = 0;
    var dx = 10;
    var dy = 1;
    lines.forEach(function (l) {
        var num = +l.substring(1);
        if (l.startsWith("E")) {
            dx += num;
        }
        else if (l.startsWith("W")) {
            dx -= num;
        }
        else if (l.startsWith("N")) {
            dy += num;
        }
        else if (l.startsWith("S")) {
            dy -= num;
        }
        else if (l.startsWith("F")) {
            x += num * dx;
            y += num * dy;
        }
        else if (l.startsWith("L")) {
            // (0, 1)
            for (; num > 0; num -= 90) {
                var tmp = dx;
                dx = -dy;
                dy = tmp;
            }
            // (-1, 0)
        }
        else if (l.startsWith("R")) {
            // (-1, 0)
            for (; num > 0; num -= 90) {
                var tmp = dx;
                dx = dy;
                dy = -tmp;
            }
            // (0, 1)
        }
    });
    return Math.abs(x) + Math.abs(y);
}
var arr = ("" + fs.readFileSync("ex12.txt")).split("\n");
console.log("Advent 12.2: ", ex1(arr));
