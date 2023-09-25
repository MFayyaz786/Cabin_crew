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
const { addNew, updateDevice } = validator_1.default;
//* createUser
const addNewDevice = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = addNew.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const booth = await service_1.default.create(req.body);
    if (booth) {
        return res.status(201).send({ msg: "Device Added", data: booth });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
//* getAll
const getAll = (0, catchAsync_1.default)(async (req, res) => {
    const booths = await service_1.default.getAll(req.query);
    return res.status(200).send({ msg: "Devices", data: booths });
});
//* getOne
const getOne = (0, catchAsync_1.default)(async (req, res) => {
    const booth = await service_1.default.getOne(req.params.id);
    if (booth) {
        return res.status(200).send({ msg: "Device", data: booth });
    }
    else {
        return res.status(404).send({ msg: "Not Found!" });
    }
});
//* update
const update = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = updateDevice.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const result = await service_1.default.update(String(req.params.id), req.body);
    if (result.affected) {
        return res.status(200).send({ msg: "Device Updated" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
const deleteDevice = (0, express_async_handler_1.default)(async (req, res, next) => {
    //const isAssigned=await 
    const result = await service_1.default.delete(String(req.params.id));
    // if(result.affected===0){
    //  return res.status(404).send({msg:"Not Found!"})
    // }
    if (result.affected) {
        return res.status(200).send({
            msg: "deleted"
        });
    }
    else {
        return res.status(400).send({ msg: "failed" });
    }
});
exports.default = { addNewDevice, getAll, getOne, update, deleteDevice };
