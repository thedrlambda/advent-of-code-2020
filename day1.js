"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ex1 = void 0;
function ex1(input) {
    for (var i = 0; i < input.length - 1; i++)
        for (var j = i + 1; j < input.length; j++)
            if (input[i] + input[j] === 2020) {
                return input[i] * input[j];
            }
    return 514579;
}
exports.ex1 = ex1;
