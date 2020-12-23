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
function countNeighbors(tmp, x, y, z) {
    var count = 0;
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            for (var dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0)
                    continue;
                if (tmp[x + dx][y + dy][z + dz])
                    count++;
            }
        }
    }
    return count;
}
function countNeighbors2(map, x, y, z, w) {
    var count = 0;
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            for (var dz = -1; dz <= 1; dz++) {
                for (var dw = -1; dw <= 1; dw++) {
                    if (dx === 0 && dy === 0 && dz === 0 && dw === 0)
                        continue;
                    if (map[x + dx + "," + (y + dy) + "," + (z + dz) + "," + (w + dw)])
                        count++;
                }
            }
        }
    }
    return count;
}
function ex1(file) {
    var tmp = [];
    for (var x = -7; x < file.length + 7; x++) {
        tmp.push([]);
        for (var y = -7; y < file[0].length + 7; y++) {
            tmp[tmp.length - 1].push([]);
            for (var z = 0; z < 7; z++) {
                tmp[tmp.length - 1][tmp[tmp.length - 1].length - 1].push(false);
            }
            tmp[tmp.length - 1][tmp[tmp.length - 1].length - 1].push((file[x] || [])[y] || false);
            for (var z = 0; z < 7; z++) {
                tmp[tmp.length - 1][tmp[tmp.length - 1].length - 1].push(false);
            }
        }
    }
    var active = 0;
    for (var i = 0; i < 6; i++) {
        var map = [];
        active = 0;
        for (var x = 0; x < tmp.length; x++) {
            map.push([]);
            for (var y = 0; y < tmp[x].length; y++) {
                map[x].push([]);
                for (var z = 0; z < tmp[x][y].length; z++) {
                    if (x < 1 ||
                        x >= tmp.length - 1 ||
                        y < 1 ||
                        y >= tmp[x].length - 1 ||
                        z < 1 ||
                        z >= tmp[x][y].length - 1) {
                        map[x][y].push(false);
                        continue;
                    }
                    var n = countNeighbors(tmp, x, y, z);
                    if (n === 3)
                        map[x][y].push(true);
                    else if (n === 2)
                        map[x][y].push(tmp[x][y][z]);
                    else
                        map[x][y].push(false);
                    if (map[x][y][z])
                        active++;
                }
            }
        }
        console.log(active);
        tmp = map;
    }
    return active;
}
function printMap(tmp) {
    for (var z = 0; z < tmp[0][0].length; z++) {
        console.log("z=" + z);
        for (var y = 0; y < tmp[0].length; y++) {
            var result = "";
            for (var x = 0; x < tmp.length; x++) {
                result += tmp[x][y][z] ? "#" : ".";
            }
            console.log(result);
        }
    }
}
function ex2(initial) {
    var map = {};
    for (var x = 0; x < initial.length; x++) {
        for (var y = 0; y < initial[x].length; y++) {
            map[x + "," + y + ",0,0"] = initial[x][y];
        }
    }
    var _loop_1 = function (i) {
        var tmp = {};
        Object.keys(map).forEach(function (pos) {
            var dim = pos.split(",");
            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    for (var dz = -1; dz <= 1; dz++) {
                        for (var dw = -1; dw <= 1; dw++) {
                            var n = countNeighbors2(map, +dim[0] + dx, +dim[1] + dy, +dim[2] + dz, +dim[3] + dw);
                            if (n === 3 ||
                                (n === 2 &&
                                    map[+dim[0] + dx + "," + (+dim[1] + dy) + "," + (+dim[2] + dz) + "," + (+dim[3] + dw)]))
                                tmp[+dim[0] + dx + "," + (+dim[1] + dy) + "," + (+dim[2] + dz) + "," + (+dim[3] + dw)] = true;
                        }
                    }
                }
            }
        });
        map = tmp;
    };
    for (var i = 0; i < 6; i++) {
        _loop_1(i);
    }
    return Object.keys(map).length;
}
var file = ("" + fs.readFileSync("ex17.txt"))
    .split("\n")
    .map(function (x) { return x.split("").map(function (x) { return x === "#"; }); });
console.log("Advent 17.2: ", ex2(file));
