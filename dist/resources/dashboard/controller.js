"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
//* Air port manager states
const getStates = (0, catchAsync_1.default)(async (req, res) => {
    const states = await service_1.default.getAll();
    return res.status(200).send({ msg: "States", data: states });
});
//staff panel states
const getStaffStates = (0, catchAsync_1.default)(async (req, res) => {
    const flights = await service_1.default.getStaffStates();
    return res.status(200).send({ msg: "States", data: flights });
});
//* air line states
const getAirLineStates = (0, catchAsync_1.default)(async (req, res) => {
    const flight = await service_1.default.getAirLineStates(req.params.id);
    return res.status(200).send({ msg: "States", data: flight });
});
exports.default = { getStates, getAirLineStates, getStaffStates };
