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
var arr = ("" + fs.readFileSync("ex13.txt")).split("\n");
var departureTime = +arr[0];
var busIds = arr[1].split(",");
function ex1(departureTime, busIds) {
    busIds = busIds.filter(function (x) { return x !== "x"; });
    var i;
    var busId;
    for (i = 0;; i++) {
        var tmp = busIds.find(function (x) { return (departureTime + i) % +x === 0; });
        if (tmp !== undefined) {
            busId = +tmp;
            break;
        }
    }
    return busId * i;
}
function ex2(busIds) {
    var i = 0;
    var max = -1;
    busIds.forEach(function (x, p) {
        if (+x > max) {
            max = +x;
            i = -p;
        }
    });
    for (;; i += max) {
        if (busIds.every(function (x, p) { return x === "x" || (i + p) % +x === 0; }))
            break;
    }
    return i;
}
console.log("Advent 13.2: ", ex2(busIds));
