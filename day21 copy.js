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
var counter = {};
var possibilities = {};
function parseLine(line) {
    var tmp = line.split(")");
    var parts = tmp[0].split(" (contains ");
    var ingredients = parts[0].split(" ");
    var allergens = parts[1].split(", ");
    allergens.forEach(function (allergen) {
        if (possibilities[allergen] === undefined) {
            possibilities[allergen] = __spread(ingredients);
        }
        else {
            possibilities[allergen] = possibilities[allergen].filter(function (x) {
                return ingredients.includes(x);
            });
        }
    });
    ingredients.forEach(function (x) { return (counter[x] = (counter[x] || 0) + 1); });
}
function ex1() {
    var safe = Object.keys(counter);
    Object.values(possibilities).forEach(function (xs) {
        safe = safe.filter(function (x) { return !xs.includes(x); });
    });
    return safe.reduce(function (a, x) { return a + counter[x]; }, 0);
}
function ex2() {
    var unique = [];
    var keys = Object.keys(possibilities);
    var _loop_1 = function () {
        var allergen = keys.find(function (x) { return possibilities[x].length === 1; });
        if (allergen === undefined)
            return "break";
        var ingredient = possibilities[allergen][0];
        unique.push({ allergen: allergen, ingredient: ingredient });
        keys.forEach(function (x) {
            return (possibilities[x] = possibilities[x].filter(function (i) { return i !== ingredient; }));
        });
    };
    while (true) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    unique.sort(function (a, b) { return a.allergen.localeCompare(b.allergen); });
    return unique.map(function (x) { return x.ingredient; }).join(",");
}
("" + fs.readFileSync("ex21.txt")).split(/\n/).forEach(parseLine);
console.log("Advent 21.2: ", ex2());
