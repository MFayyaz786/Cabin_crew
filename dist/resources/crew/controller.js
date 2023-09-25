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
const class_validator_1 = require("class-validator");
const service_2 = __importDefault(require("../deviceAPIs/service"));
const { addNew, updateCrew, registerThumb, verifyThumb, pushCrewDetails } = validator_1.default;
//* createUser
const create = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = addNew.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const crew = await service_1.default.create(req.body);
    if (crew) {
        const isSend = await service_2.default.pushRegisterCrew(crew.cardNo, crew.employId, crew.name, crew.image);
        if (isSend.Status === true) {
            await service_1.default.updateDeliveredStatus(String(crew.id));
            return res.status(200).send({ msg: "Crew Added" });
        }
        else {
            return res.status(200).send({ msg: isSend.msg });
        }
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
//push crew to device
const pushCrewData = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = pushCrewDetails.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const isSend = await service_2.default.pushRegisterCrew(req.body.cardNo, req.body.employeeId, req.body.name, req.body.image);
    if (isSend.Status === true) {
        await service_1.default.updateDeliveredStatus(String(req.body.crewId));
        return res.status(200).send({ msg: "Success" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
//register crew thumb 
const registerCrewThumb = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = registerThumb.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const thumbImpression = await service_2.default.registerThumbImpression(req.body.cardNo);
    if (thumbImpression.Status === true && thumbImpression.Data.FPData !== null) {
        // const isRegistered=await service.isRegistered(req.body.employId,req.body.cardNo);
        // if(isRegistered){
        //   return res.status(400).send({msg:"Thumb impression already registered"})
        // }
        //  if (!isBase64(thumbImpression.Data.FPData)) {
        //   return res.status(400).send({msg:"Please send thumb impression into base64 encoded!"});
        // }
        const crew = await service_1.default.registerThumb(req.body.cardNo, thumbImpression.Data.FPData);
        if (crew === 1) {
            return res.status(200).send({ msg: "Crew thumb registered" });
        }
        else {
            return res.status(400).send({ msg: "Failed!" });
        }
    }
    else {
        return res.status(400).send({ msg: "Crew thumb impression does't exist on device!" });
    }
});
//verify thumb impression
const verifyThumbImpression = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = verifyThumb.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    if (!(0, class_validator_1.isBase64)(req.body.thumbImpression)) {
        return res.status(400).send({ msg: "Please send thumb impression into base64 encoded!" });
    }
    const crew = await service_1.default.verifyThumbImpression(req.body.thumbImpression);
    if (crew) {
        return res.status(200).send({ msg: "Crew thumb verified" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
//* getAll
const getAll = (0, catchAsync_1.default)(async (req, res) => {
    const crews = await service_1.default.getAll();
    return res.status(200).send({ msg: "Crew List", data: crews });
});
//* getAll verified
const getAllVerified = (0, catchAsync_1.default)(async (req, res) => {
    const crews = await service_1.default.getAllVerified(req.params.airLine);
    return res.status(200).send({ msg: "Crew List", data: crews });
});
//get list by airline
const getCrewsByAirLine = (0, catchAsync_1.default)(async (req, res) => {
    const crews = await service_1.default.getCrewsByAirLine(req.params.airLine);
    return res.status(200).send({ msg: "Crew List", data: crews });
});
//* getOne
const getOne = (0, catchAsync_1.default)(async (req, res) => {
    const crew = await service_1.default.getOne(req.params.id);
    if (crew) {
        return res.status(200).send({ msg: "Crew", data: crew });
    }
    else {
        return res.status(404).send({ msg: "Not Found!" });
    }
});
//* update
const update = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = updateCrew.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const result = await service_1.default.update(String(req.params.id), req.body);
    if (result.affected) {
        return res.status(200).send({ msg: "Crew Updated" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
const deleteCrew = (0, express_async_handler_1.default)(async (req, res, next) => {
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
        return res.status(400).send({ msg: "failed!" });
    }
});
exports.default = { create, getAll, getOne, update, deleteCrew, getCrewsByAirLine, registerCrewThumb, verifyThumbImpression, getAllVerified, pushCrewData };
