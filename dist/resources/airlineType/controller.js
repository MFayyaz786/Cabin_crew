"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const service_1 = __importDefault(require("./service"));
const validator_1 = __importDefault(require("./validator"));
const { addNewSchema, updateSchema } = validator_1.default;
const appError_1 = __importDefault(require("../../utils/appError"));
const addNew = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = addNewSchema.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const result = await service_1.default.add(req.body);
    console.log(result);
    if (result) {
        return res.status(201).send({ msg: "Success" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
const getAll = (0, express_async_handler_1.default)(async (req, res, next) => {
    const result = await service_1.default.getAll();
    return res.status(200).send({ msg: "list", data: result });
    //return next();
});
const getOne = (0, express_async_handler_1.default)(async (req, res, next) => {
    const result = await service_1.default.getOne(String(req.query.id));
    if (result) {
        return res.status(200).send({ msg: "Airline", data: result });
    }
    else {
        return res.status(404).send({ msg: "Not Found" });
    }
});
const updateAirLine = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = updateSchema.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const result = await service_1.default.update(String(req.body.id), req.body);
    if (result.affected) {
        return res.status(200).send({ msg: "Updated" });
    }
    else {
        return res.status(404).send({ msg: "Failed!" });
    }
});
const deleteAirLine = (0, express_async_handler_1.default)(async (req, res, next) => {
    // const isAssigned=await UserService.isAssignedAirLine(req.params.id)
    // if(isAssigned){
    //   return res.status(400).send({msg:"This air line assigned!"})
    // }
    const result = await service_1.default.delete(String(req.params.id));
    // console.log(result)
    // if(!result.affected){
    //  return res.status(404).send({msg:"Not Found!"})
    // }
    if (result.affected) {
        return res.status(200).send({ msg: "deleted" });
    }
    else {
        return res.status(400).send({ msg: "failed" });
    }
});
exports.default = { addNew, getAll, getOne, updateAirLine, deleteAirLine };
