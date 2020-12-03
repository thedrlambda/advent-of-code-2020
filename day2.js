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
exports.driver = exports.ex2 = exports.ex1 = void 0;
var fs = __importStar(require("fs"));
function isValidExercise1(conf) {
    var count = 0;
    for (var i = 0; i < conf.password.length; i++) {
        if (conf.password.charAt(i) === conf.policy.char) {
            count++;
        }
    }
    return conf.policy.min <= count && count <= conf.policy.max;
}
function xor(a, b) {
    return (a && !b) || (!a && b);
}
function isValidExercise2(conf) {
    return xor(conf.password.charAt(conf.policy.min - 1) === conf.policy.char, conf.password.charAt(conf.policy.max - 1) === conf.policy.char);
}
function core(validator, input) {
    var valid = 0;
    for (var i = 0; i < input.length; i++)
        if (validator(input[i])) {
            valid++;
        }
    return valid;
}
function ex1(input) {
    return core(isValidExercise1, input);
}
exports.ex1 = ex1;
function ex2(input) {
    return core(isValidExercise2, input);
}
exports.ex2 = ex2;
function parse(line) {
    var parts = line.split(": ");
    var policyParts = parts[0].split(" ");
    var rangeParts = policyParts[0].split("-");
    return {
        policy: { min: +rangeParts[0], max: +rangeParts[1], char: policyParts[1] },
        password: parts[1],
    };
}
function driver(validator, readFile, output) {
    var content = readFile();
    var input = content.split("\n").map(parse);
    output("" + core(validator, input));
}
exports.driver = driver;
driver(isValidExercise2, function () { return "" + fs.readFileSync("ex2.txt"); }, function (s) { return console.log(s); });
