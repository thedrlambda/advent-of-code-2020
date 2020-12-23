function generator(turns: number) {
  let map: { [key: number]: number } = {};
  let starters = [16, 11, 15, 0, 1, 7];
  let prev = starters[0];
  for (let turn = 0; turn < turns; turn++) {
    let num: number;
    if (turn < starters.length) {
      num = starters[turn];
    } else {
      num = map[prev] !== undefined ? turn - map[prev] : 0;
    }
    map[prev] = turn;
    prev = num;
  }
  return prev;
}
function ex1() {
  return generator(2020);
}
function ex2() {
  return generator(30000000);
}
console.log("Advent 15.2: ", ex2());
