import * as fs from "fs";

let counter: { [key: string]: number } = {};
let possibilities: { [allergen: string]: string[] } = {};

function parseLine(line: string) {
  let tmp = line.split(")");
  let parts = tmp[0].split(" (contains ");
  let ingredients = parts[0].split(" ");
  let allergens = parts[1].split(", ");
  allergens.forEach((allergen) => {
    if (possibilities[allergen] === undefined) {
      possibilities[allergen] = [...ingredients];
    } else {
      possibilities[allergen] = possibilities[allergen].filter((x) =>
        ingredients.includes(x)
      );
    }
  });
  ingredients.forEach((x) => (counter[x] = (counter[x] || 0) + 1));
}

function ex1() {
  let safe = Object.keys(counter);
  Object.values(possibilities).forEach((xs) => {
    safe = safe.filter((x) => !xs.includes(x));
  });
  return safe.reduce((a, x) => a + counter[x], 0);
}

function ex2() {
  let unique: { allergen: string; ingredient: string }[] = [];
  let keys = Object.keys(possibilities);
  while (true) {
    let allergen = keys.find((x) => possibilities[x].length === 1);
    if (allergen === undefined) break;
    let ingredient = possibilities[allergen][0];
    unique.push({ allergen, ingredient });
    keys.forEach(
      (x) =>
        (possibilities[x] = possibilities[x].filter((i) => i !== ingredient))
    );
  }
  unique.sort((a, b) => a.allergen.localeCompare(b.allergen));
  return unique.map((x) => x.ingredient).join(",");
}

("" + fs.readFileSync("ex21.txt")).split(/\n/).forEach(parseLine);

console.log("Advent 21.2: ", ex2());
