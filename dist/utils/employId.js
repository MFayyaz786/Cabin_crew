"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employId = () => {
    const employId = Math.floor(10000000 + Math.random() * 90000000);
    return employId;
};
exports.default = employId;
