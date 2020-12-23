import * as fs from "fs";

let file = ("" + fs.readFileSync("ex19.txt")).split(/\n\r?\n|\r\r/);
console.log("Advent 19.2: ");
