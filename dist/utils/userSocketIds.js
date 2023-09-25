"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ids = [];
const addUser = async (userId, socketId) => {
    ids.push({ userId, socketId });
    console.log(ids);
};
const deleteUser = async (socketId) => {
    ids = ids.filter((id) => socketId !== id.socketId);
    console.log(ids);
};
exports.default = { addUser, deleteUser };
