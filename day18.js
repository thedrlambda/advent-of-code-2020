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
1 + (2 * 3) + 4
[1]
[1] op=+
{[2] op=},{[1] op=+}
{[2] op=*},{[1] op=+}
{[6] op=},{[1] op=+}
{[7] op=}
*/
function evalLine(line) {
    var stack = [function (a) { return a; }];
    var _loop_1 = function (i) {
        var c = line.charAt(i);
        var inner = stack[stack.length - 1];
        if (c === " ")
            return "continue";
        else if ("0" <= c && c <= "9") {
            stack[stack.length - 1] = function () { return inner(+c); };
        }
        else if (c === "+") {
            stack[stack.length - 1] = function (a) { return inner() + a; };
        }
        else if (c === "*") {
            stack[stack.length - 1] = function (a) { return inner() * a; };
        }
        else if (c === "(") {
            stack.push(function (a) { return a; });
        }
        else if (c === ")") {
            stack.pop();
            var outer_1 = stack[stack.length - 1];
            stack[stack.length - 1] = function () { return outer_1(inner()); };
        }
    };
    for (var i = 0; i < line.length; i++) {
        _loop_1(i);
    }
    return stack[0]();
}
function ex2(line) {
    var stack = [{ add: 0, mult: 1 }];
    for (var i = 0; i < line.length; i++) {
        var c = line.charAt(i);
        var inner = stack[stack.length - 1];
        if (c === " ")
            continue;
        else if ("0" <= c && c <= "9") {
            stack[stack.length - 1].add += +c;
        }
        else if (c === "+") {
        }
        else if (c === "*") {
            stack[stack.length - 1].mult *= stack[stack.length - 1].add;
            stack[stack.length - 1].add = 0;
        }
        else if (c === "(") {
            stack.push({ add: 0, mult: 1 });
        }
        else if (c === ")") {
            var inner_1 = stack.pop();
            stack[stack.length - 1].add += inner_1.add * inner_1.mult;
        }
    }
    return stack[0].add * stack[0].mult;
}
var sum = ("" + fs.readFileSync("ex18.txt"))
    .split("\n")
    .map(ex2)
    .reduce(function (a, x) { return a + x; }, 0);
console.log("Advent 18.2: ", sum);
