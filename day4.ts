import * as fs from "fs";

export function isValidEx1(data: any) {
  return (
    data["byr"] !== undefined &&
    data["iyr"] !== undefined &&
    data["eyr"] !== undefined &&
    data["hgt"] !== undefined &&
    data["hcl"] !== undefined &&
    data["ecl"] !== undefined &&
    data["pid"] !== undefined
  );
}

export function isValidEx2(WhatDoesAHouseWear_ADress: any) {
  if (!isValidEx1(WhatDoesAHouseWear_ADress)) {
    return false;
  }
  if (
    !(
      1920 <= WhatDoesAHouseWear_ADress["byr"] &&
      WhatDoesAHouseWear_ADress["byr"] <= 2002
    )
  ) {
    // console.log("byr", WhatDoesAHouseWear_ADress["byr"]);
    return false;
  }
  if (
    !(
      2010 <= WhatDoesAHouseWear_ADress["iyr"] &&
      WhatDoesAHouseWear_ADress["iyr"] <= 2020
    )
  ) {
    // console.log("iyr", WhatDoesAHouseWear_ADress["iyr"]);
    return false;
  }
  if (
    !(
      2020 <= WhatDoesAHouseWear_ADress["eyr"] &&
      WhatDoesAHouseWear_ADress["eyr"] <= 2030
    )
  ) {
    // console.log("eyr", WhatDoesAHouseWear_ADress["eyr"]);
    return false;
  }
  if (
    !(
      (WhatDoesAHouseWear_ADress["hgt"].endsWith("cm") &&
        150 <=
          WhatDoesAHouseWear_ADress["hgt"].substring(
            0,
            WhatDoesAHouseWear_ADress["hgt"].length - 2
          ) &&
        WhatDoesAHouseWear_ADress["hgt"].substring(
          0,
          WhatDoesAHouseWear_ADress["hgt"].length - 2
        ) <= 193) ||
      (WhatDoesAHouseWear_ADress["hgt"].endsWith("in") &&
        59 <=
          WhatDoesAHouseWear_ADress["hgt"].substring(
            0,
            WhatDoesAHouseWear_ADress["hgt"].length - 2
          ) &&
        WhatDoesAHouseWear_ADress["hgt"].substring(
          0,
          WhatDoesAHouseWear_ADress["hgt"].length - 2
        ) <= 76)
    )
  ) {
    // console.log("hgt", WhatDoesAHouseWear_ADress["hgt"]);
    return false;
  }
  if (!/^#[0-9a-f]{6}$/.test(WhatDoesAHouseWear_ADress["hcl"])) {
    // console.log("hcl", WhatDoesAHouseWear_ADress["hcl"]);
    return false;
  }
  if (
    !["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
      WhatDoesAHouseWear_ADress["ecl"]
    )
  ) {
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

function parse(input: string) {
  let parts = input.split(" ");
  let result: { [key: string]: string } = {};
  parts.forEach((x) => {
    let buffer = x.trim().split(":");
    result[buffer[0]] = buffer[1];
  });
  return result;
}

export function parseFile(isValid: (_: any) => boolean, content: string) {
  let blocks = content.split(/\n\r?\n|\r\r/);
  let valids = blocks
    .map((x) => parse(x.replace(/\n/g, " ").replace(/  /g, " ")))
    .reduce((a, x) => (isValid(x) ? a + 1 : a), 0);
  return valids;
}

console.log(parseFile(isValidEx2, "" + fs.readFileSync("ex4.txt")));
