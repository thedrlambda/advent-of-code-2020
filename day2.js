"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ex1core = void 0;
function isValid(conf) {
    var count = 0;
    for (var i = 0; i < conf.password.length; i++) {
        if (conf.password.charAt(i) === conf.policy.char) {
            count++;
        }
    }
    return conf.policy.min <= count && count <= conf.policy.max;
}
function ex1core(input) {
    var valid = 0;
    for (var i = 0; i < input.length; i++)
        if (isValid(input[i])) {
            valid++;
        }
    return valid;
}
exports.ex1core = ex1core;
