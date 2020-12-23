import * as fs from "fs";

class Range {
  constructor(private min: number, private max: number) {}
  test(t: number) {
    return this.min <= t && t <= this.max;
  }
}

let rules: { [key: string]: Range[] } = {};

function parseRule(line: string) {
  let parts = line.split(": ");
  let ranges = parts[1].split(" or ");
  rules[parts[0]] = ranges.map((x) => {
    let nums = x.split("-");
    return new Range(+nums[0], +nums[1]);
  });
}

function checkTickets(lines: string[]) {
  let sum = 0;
  let fields = Object.keys(rules);
  for (let l = 0; l < lines.length; l++) {
    let nums = lines[l].split(",");
    loop: for (let i = 0; i < nums.length; i++) {
      let x = nums[i];
      for (let f = 0; f < fields.length; f++) {
        let field = fields[f];
        for (let r = 0; r < rules[field].length; r++) {
          let range = rules[field][r];
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

function ex2(our: string, others: string[]) {
  let fields = Object.keys(rules);
  for (let l = 0; l < others.length; l++) {
    let nums = others[l].split(",");
    loop: for (let i = 0; i < nums.length; i++) {
      let x = nums[i];
      for (let f = 0; f < fields.length; f++) {
        let field = fields[f];
        for (let r = 0; r < rules[field].length; r++) {
          let range = rules[field][r];
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
  let ourParts = our.split(",");
  let option: string[][] = [];
  for (let i = 0; i < ourParts.length; i++) {
    option.push([...fields]);
  }
  for (let l = 0; l < others.length; l++) {
    let nums = others[l].split(",");
    for (let i = 0; i < nums.length; i++) {
      let x = +nums[i];
      option[i] = option[i].filter((field) =>
        rules[field].some((r) => r.test(x))
      );
    }
  }
  let unique = [];
  let i: number;
  while ((i = option.findIndex((x) => x.length === 1)) >= 0) {
    unique[i] = option[i][0];
    // option.forEach((fs) => fs.splice(fs.indexOf(option[i][0]), 1));
    option = option.map((fs) => fs.filter((x) => x !== option[i][0]));
  }
  let product = 1;
  unique.forEach((x, i) => {
    if (x.startsWith("departure")) product *= +ourParts[i];
  });
  return product;
}

let allLines = ("" + fs.readFileSync("ex16.txt")).split("\n");
let sections: string[][] = [[]];
for (let i = 0; i < allLines.length; i++) {
  if (allLines[i].trim().length === 0) {
    sections.push([]);
    i++;
  } else {
    sections[sections.length - 1].push(allLines[i]);
  }
}
sections[0].forEach(parseRule);
console.log("Advent 16.2: ", ex2(sections[1][0], sections[2]));
