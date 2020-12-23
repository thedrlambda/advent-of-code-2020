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
var Range = /** @class */ (function () {
    function Range(min, max) {
        this.min = min;
        this.max = max;
    }
    Range.prototype.test = function (t) {
        return this.min <= t && t <= this.max;
    };
    return Range;
}());
var rules = {};
function parseRule(line) {
    var parts = line.split(": ");
    var ranges = parts[1].split(" or ");
    rules[parts[0]] = ranges.map(function (x) {
        var nums = x.split("-");
        return new Range(+nums[0], +nums[1]);
    });
}
function checkTickets(lines) {
    var sum = 0;
    var fields = Object.keys(rules);
    for (var l = 0; l < lines.length; l++) {
        var nums = lines[l].split(",");
        loop: for (var i = 0; i < nums.length; i++) {
            var x = nums[i];
            for (var f = 0; f < fields.length; f++) {
                var field = fields[f];
                for (var r = 0; r < rules[field].length; r++) {
                    var range = rules[field][r];
                    if (range.test(+x)) {
                        continue loop;
                    }
                }
            }
            sum += +x;
        }
    }
    return sum;
}
function ex2(our, others) {
    var fields = Object.keys(rules);
    for (var l = 0; l < others.length; l++) {
        var nums = others[l].split(",");
        loop: for (var i_1 = 0; i_1 < nums.length; i_1++) {
            var x = nums[i_1];
            for (var f = 0; f < fields.length; f++) {
                var field = fields[f];
                for (var r = 0; r < rules[field].length; r++) {
                    var range = rules[field][r];
                    if (range.test(+x)) {
                        continue loop;
                    }
                }
            }
            others.splice(l, 1);
            l--;
            break;
        }
    }
    var ourParts = our.split(",");
    var option = [];
    for (var i_2 = 0; i_2 < ourParts.length; i_2++) {
        option.push(__spread(fields));
    }
    for (var l = 0; l < others.length; l++) {
        var nums = others[l].split(",");
        var _loop_1 = function (i_3) {
            var x = +nums[i_3];
            option[i_3] = option[i_3].filter(function (field) {
                return rules[field].some(function (r) { return r.test(x); });
            });
        };
        for (var i_3 = 0; i_3 < nums.length; i_3++) {
            _loop_1(i_3);
        }
    }
    var unique = [];
    var i;
    while ((i = option.findIndex(function (x) { return x.length === 1; })) >= 0) {
        unique[i] = option[i][0];
        // option.forEach((fs) => fs.splice(fs.indexOf(option[i][0]), 1));
        option = option.map(function (fs) { return fs.filter(function (x) { return x !== option[i][0]; }); });
    }
    var product = 1;
    unique.forEach(function (x, i) {
        if (x.startsWith("departure"))
            product *= +ourParts[i];
    });
    return product;
}
var allLines = ("" + fs.readFileSync("ex16.txt")).split("\n");
var sections = [[]];
for (var i = 0; i < allLines.length; i++) {
    if (allLines[i].trim().length === 0) {
        sections.push([]);
        i++;
    }
    else {
        sections[sections.length - 1].push(allLines[i]);
    }
}
sections[0].forEach(parseRule);
console.log("Advent 16.2: ", ex2(sections[1][0], sections[2]));
