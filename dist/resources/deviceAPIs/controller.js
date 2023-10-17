"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const service_1 = __importDefault(require("./service"));
//* get All Logs
const getAllLogs = (0, express_async_handler_1.default)(async (req, res) => {
    const list = await service_1.default.getAllLogs(req.query.startDate, req.query.toDate);
    const socket = req.app.get("socket");
    socket.emit("logs", JSON.stringify(list));
    return res.status(200).send({ msg: "List", data: list });
});
exports.default = { getAllLogs };
