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
/*
0: 1 2
1: 3 4
2: "b"
4: "a"
3: 5 | 6
5: 4 | 4 5
6: 2
(a* | b) a | b

aaab

*/
var Type;
(function (Type) {
    Type[Type["Conj"] = 0] = "Conj";
    Type[Type["Disj"] = 1] = "Disj";
    Type[Type["Symbol"] = 2] = "Symbol";
})(Type || (Type = {}));
var rules = {};
function assertExhausted(x) {
    throw new Error("Unexpected object: " + x);
}
function matches(str, index, rule, succ, fail) {
    if (index >= str.length)
        return fail();
    if (rule.type === Type.Symbol) {
        if (rule.symbol === str.charAt(index)) {
            return succ(index + 1, fail);
        }
        else {
            return fail();
        }
    }
    else if (rule.type === Type.Conj) {
        var k = succ;
        var _loop_1 = function (i) {
            var r = rules[rule.elems[i]];
            var tmp = function (k) { return function (p, f) {
                return matches(str, p, r, k, f);
            }; };
            var tmp2 = tmp(k);
            k = tmp2;
        };
        for (var i = rule.elems.length - 1; i >= 0; i--) {
            _loop_1(i);
        }
        return k(index, fail);
    }
    else if (rule.type === Type.Disj) {
        return matches(str, index, rule.left, succ, function () {
            return matches(str, index, rule.right, succ, fail);
        });
    }
    else {
        assertExhausted(rule);
    }
}
function parseRule(line) {
    var parts = line.trim().split(": ");
    var ruleParts = parts[1].split(" | ");
    if (ruleParts.length > 1) {
        rules[parts[0]] = {
            type: Type.Disj,
            left: { type: Type.Conj, elems: ruleParts[0].split(" ").map(function (x) { return x; }) },
            right: { type: Type.Conj, elems: ruleParts[1].split(" ").map(function (x) { return x; }) },
        };
    }
    else {
        if (parts[1].includes('"')) {
            rules[parts[0]] = { type: Type.Symbol, symbol: ruleParts[0].charAt(1) };
        }
        else {
            var ruleParts_1 = parts[1].split(" ");
            rules[parts[0]] = { type: Type.Conj, elems: ruleParts_1.map(function (x) { return x; }) };
        }
    }
}
var file = ("" + fs.readFileSync("ex19.txt")).split(/\n\r?\n|\r\r/);
file[0]
    .split("\n")
    .map(function (x) { return x.trim(); })
    .forEach(parseRule);
rules["8"] = {
    type: Type.Disj,
    left: { type: Type.Conj, elems: ["42", "8"] },
    right: { type: Type.Conj, elems: ["42"] },
};
rules["11"] = {
    type: Type.Disj,
    left: { type: Type.Conj, elems: ["42", "11", "31"] },
    right: { type: Type.Conj, elems: ["42", "31"] },
};
// console.log(rules);
var valid = file[1]
    .split("\n")
    .map(function (x) { return x.trim(); })
    .map(function (line) {
    return matches(line, 0, rules["0"], function (i, fail) {
        if (line.length !== i)
            return fail();
        else
            return true;
    }, function () { return false; });
})
    .filter(function (x) { return x; }).length;
console.log("Advent 19.2: ", valid);
