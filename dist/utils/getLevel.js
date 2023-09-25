"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (session) => {
    const array = session.split(",");
    const length = array.length;
    if (length == 1) {
        return {
            level: 0,
        };
    }
    else if (length == 2) {
        return {
            level: 1,
            menu: array[1],
        };
    }
    else if (length == 3) {
        return {
            level: 2,
            menu: array[1],
            subMenu: array[2],
        };
    }
    else {
        return { level: 0 };
    }
};
