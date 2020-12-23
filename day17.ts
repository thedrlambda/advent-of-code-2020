import * as fs from "fs";

function countNeighbors(tmp: boolean[][][], x: number, y: number, z: number) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) continue;
        if (tmp[x + dx][y + dy][z + dz]) count++;
      }
    }
  }
  return count;
}

function countNeighbors2(
  map: { [key: string]: boolean },
  x: number,
  y: number,
  z: number,
  w: number
) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let dw = -1; dw <= 1; dw++) {
          if (dx === 0 && dy === 0 && dz === 0 && dw === 0) continue;
          if (map[`${x + dx},${y + dy},${z + dz},${w + dw}`]) count++;
        }
      }
    }
  }
  return count;
}

function ex1(file: boolean[][]) {
  let tmp: boolean[][][] = [];
  for (let x = -7; x < file.length + 7; x++) {
    tmp.push([]);
    for (let y = -7; y < file[0].length + 7; y++) {
      tmp[tmp.length - 1].push([]);
      for (let z = 0; z < 7; z++) {
        tmp[tmp.length - 1][tmp[tmp.length - 1].length - 1].push(false);
      }
      tmp[tmp.length - 1][tmp[tmp.length - 1].length - 1].push(
        (file[x] || [])[y] || false
      );
      for (let z = 0; z < 7; z++) {
        tmp[tmp.length - 1][tmp[tmp.length - 1].length - 1].push(false);
      }
    }
  }
  let active = 0;
  for (let i = 0; i < 6; i++) {
    let map: boolean[][][] = [];
    active = 0;
    for (let x = 0; x < tmp.length; x++) {
      map.push([]);
      for (let y = 0; y < tmp[x].length; y++) {
        map[x].push([]);
        for (let z = 0; z < tmp[x][y].length; z++) {
          if (
            x < 1 ||
            x >= tmp.length - 1 ||
            y < 1 ||
            y >= tmp[x].length - 1 ||
            z < 1 ||
            z >= tmp[x][y].length - 1
          ) {
            map[x][y].push(false);
            continue;
          }
          let n = countNeighbors(tmp, x, y, z);
          if (n === 3) map[x][y].push(true);
          else if (n === 2) map[x][y].push(tmp[x][y][z]);
          else map[x][y].push(false);
          if (map[x][y][z]) active++;
        }
      }
    }
    console.log(active);
    tmp = map;
  }
  return active;
}

function printMap(tmp: boolean[][][]) {
  for (let z = 0; z < tmp[0][0].length; z++) {
    console.log("z=" + z);
    for (let y = 0; y < tmp[0].length; y++) {
      let result = "";
      for (let x = 0; x < tmp.length; x++) {
        result += tmp[x][y][z] ? "#" : ".";
      }
      console.log(result);
    }
  }
}

function ex2(initial: boolean[][]) {
  let map: { [key: string]: boolean } = {};
  for (let x = 0; x < initial.length; x++) {
    for (let y = 0; y < initial[x].length; y++) {
      map[`${x},${y},0,0`] = initial[x][y];
    }
  }
  for (let i = 0; i < 6; i++) {
    let tmp: { [key: string]: boolean } = {};
    Object.keys(map).forEach((pos) => {
      let dim = pos.split(",");
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            for (let dw = -1; dw <= 1; dw++) {
              let n = countNeighbors2(
                map,
                +dim[0] + dx,
                +dim[1] + dy,
                +dim[2] + dz,
                +dim[3] + dw
              );
              if (
                n === 3 ||
                (n === 2 &&
                  map[
                    `${+dim[0] + dx},${+dim[1] + dy},${+dim[2] + dz},${
                      +dim[3] + dw
                    }`
                  ])
              )
                tmp[
                  `${+dim[0] + dx},${+dim[1] + dy},${+dim[2] + dz},${
                    +dim[3] + dw
                  }`
                ] = true;
            }
          }
        }
      }
    });
    map = tmp;
  }
  return Object.keys(map).length;
}

let file = ("" + fs.readFileSync("ex17.txt"))
  .split("\n")
  .map((x) => x.split("").map((x) => x === "#"));

console.log("Advent 17.2: ", ex2(file));
