"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (pre, input, addToPre) => {
    const array = pre.split(",");
    if (array.length === 0) {
        return "#";
    }
    if (addToPre) {
        return `${pre},${input}`;
    }
    else {
        if (pre.startsWith("#,2")) {
            return "#,2";
        }
        if (array.includes("2")) {
            array.splice(array.indexOf("2"), 1);
            return array.join(",");
        }
        else {
            return "#";
        }
    }
};
