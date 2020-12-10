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
exports.parseFile = exports.isValidEx2 = exports.isValidEx1 = void 0;
var fs = __importStar(require("fs"));
function isValidEx1(data) {
    return (data["byr"] !== undefined &&
        data["iyr"] !== undefined &&
        data["eyr"] !== undefined &&
        data["hgt"] !== undefined &&
        data["hcl"] !== undefined &&
        data["ecl"] !== undefined &&
        data["pid"] !== undefined);
}
exports.isValidEx1 = isValidEx1;
function isValidEx2(WhatDoesAHouseWear_ADress) {
    if (!isValidEx1(WhatDoesAHouseWear_ADress)) {
        return false;
    }
    if (!(1920 <= WhatDoesAHouseWear_ADress["byr"] &&
        WhatDoesAHouseWear_ADress["byr"] <= 2002)) {
        // console.log("byr", WhatDoesAHouseWear_ADress["byr"]);
        return false;
    }
    if (!(2010 <= WhatDoesAHouseWear_ADress["iyr"] &&
        WhatDoesAHouseWear_ADress["iyr"] <= 2020)) {
        // console.log("iyr", WhatDoesAHouseWear_ADress["iyr"]);
        return false;
    }
    if (!(2020 <= WhatDoesAHouseWear_ADress["eyr"] &&
        WhatDoesAHouseWear_ADress["eyr"] <= 2030)) {
        // console.log("eyr", WhatDoesAHouseWear_ADress["eyr"]);
        return false;
    }
    if (!((WhatDoesAHouseWear_ADress["hgt"].endsWith("cm") &&
        150 <=
            WhatDoesAHouseWear_ADress["hgt"].substring(0, WhatDoesAHouseWear_ADress["hgt"].length - 2) &&
        WhatDoesAHouseWear_ADress["hgt"].substring(0, WhatDoesAHouseWear_ADress["hgt"].length - 2) <= 193) ||
        (WhatDoesAHouseWear_ADress["hgt"].endsWith("in") &&
            59 <=
                WhatDoesAHouseWear_ADress["hgt"].substring(0, WhatDoesAHouseWear_ADress["hgt"].length - 2) &&
            WhatDoesAHouseWear_ADress["hgt"].substring(0, WhatDoesAHouseWear_ADress["hgt"].length - 2) <= 76))) {
        // console.log("hgt", WhatDoesAHouseWear_ADress["hgt"]);
        return false;
    }
    if (!/^#[0-9a-f]{6}$/.test(WhatDoesAHouseWear_ADress["hcl"])) {
        // console.log("hcl", WhatDoesAHouseWear_ADress["hcl"]);
        return false;
    }
    if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(WhatDoesAHouseWear_ADress["ecl"])) {
        // console.log("ecl", "'" + WhatDoesAHouseWear_ADress["ecl"] + "'");
        return false;
    }
    if (!/^[0-9]{9}$/.test(WhatDoesAHouseWear_ADress["pid"])) {
        // console.log("pid", WhatDoesAHouseWear_ADress["pid"]);
        return false;
    }
    // console.log(WhatDoesAHouseWear_ADress);
    return true;
}
exports.isValidEx2 = isValidEx2;
function parse(input) {
    var parts = input.split(" ");
    var result = {};
    parts.forEach(function (x) {
        var buffer = x.trim().split(":");
        result[buffer[0]] = buffer[1];
    });
    return result;
}
function parseFile(isValid, content) {
    var blocks = content.split(/\n\r?\n|\r\r/);
    var valids = blocks
        .map(function (x) { return parse(x.replace(/\n/g, " ").replace(/  /g, " ")); })
        .reduce(function (a, x) { return (isValid(x) ? a + 1 : a); }, 0);
    return valids;
}
exports.parseFile = parseFile;
console.log(parseFile(isValidEx2, "" + fs.readFileSync("ex4.txt")));
