"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const service_1 = __importDefault(require("./service"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../utils/appError"));
const validator_1 = __importDefault(require("./validator"));
const { registered, updateProfile } = validator_1.default;
//* createUser
const create = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = registered.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    console.log(req.body);
    const user = await service_1.default.create(req.body);
    if (user) {
        return res.status(201).send({ msg: "Created" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
//* getAll
const getAll = (0, catchAsync_1.default)(async (req, res) => {
    const users = await service_1.default.getAll();
    return res.status(200).json(users);
});
// get air manager list
const getAirLineManagers = (0, catchAsync_1.default)(async (req, res) => {
    const users = await service_1.default.getAirLineManagers();
    return res.status(200).json(users);
});
//* getOne
const getOne = (0, catchAsync_1.default)(async (req, res) => {
    const user = await service_1.default.getOne(req.params.id);
    if (user) {
        return res.status(200).send({ msg: "User", data: user });
    }
    else {
        return res.status(404).send({ msg: "User not found" });
    }
});
//* update
const update = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = updateProfile.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const result = await service_1.default.update(String(req.params.id), req.body);
    if (result.affected) {
        return res.status(200).send({ msg: "Profile Updated" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
    // return next();
});
const deleteUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const result = await service_1.default.delete(String(req.params.id));
    if (result.affected === 0) {
        return res.status(404).send({ msg: "Not Found!" });
    }
    if (result) {
        return res.status(200).send({
            msg: "deleted"
        });
    }
    else {
        return res.status(400).send({ msg: "failed" });
    }
});
exports.default = { create, getAll, getOne, update, deleteUser, getAirLineManagers };
