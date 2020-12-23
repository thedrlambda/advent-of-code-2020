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
var player = ("" + fs.readFileSync("ex22.txt")).split(/\n\n/).map(function (x) {
    return x
        .split("\n")
        .slice(1)
        .map(function (k) { return +k; });
});
function ex1(p1, p2, player) {
    return p1 > p2;
}
function ex2(p1, p2, player) {
    if (p1 <= player[0].length && p2 <= player[1].length) {
        return playGame(ex2, [player[0].slice(0, p1), player[1].slice(0, p2)]);
    }
    else {
        return p1 > p2;
    }
}
function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
function playGame(ex, player) {
    var seen = [];
    while (player[0].length > 0 && player[1].length > 0) {
        if (seen.some(function (x) { return arraysEqual(x, player[0]); }))
            return true;
        seen.push(__spread(player[0]));
        var _a = __read(player[0].splice(0, 1), 1), p1 = _a[0];
        var _b = __read(player[1].splice(0, 1), 1), p2 = _b[0];
        if (ex(p1, p2, player)) {
            player[0].push(p1);
            player[0].push(p2);
        }
        else {
            player[1].push(p2);
            player[1].push(p1);
        }
    }
    return player[0].length > 0;
}
playGame(ex2, player);
var deck = player[0].length > 0 ? player[0] : player[1];
var sum = 0;
for (var i = 0; i < deck.length; i++) {
    sum += (i + 1) * deck[deck.length - i - 1];
}
console.log("Advent 22.2: ", sum);
