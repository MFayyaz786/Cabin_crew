"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const service_1 = __importDefault(require("./service"));
const appError_1 = __importDefault(require("../../utils/appError"));
const OTP_1 = __importDefault(require("../../utils/OTP"));
const validator_1 = __importDefault(require("./validator"));
const jwtServices_1 = __importDefault(require("../../utils/jwtServices"));
const uuid_1 = require("uuid");
const service_2 = __importDefault(require("../airlineType/service"));
const { registered, updateProfile, requestOtp, verifyOtpBody, resetPasswordBody, forgotPasswordBody } = validator_1.default;
const create = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { error } = registered.validate(req.body);
        if (error) {
            return next(new appError_1.default(error.details[0].message, 400));
        }
        console.log(req.body);
        const result = await service_1.default.create(req.body);
        if (result) {
            const uuid = (0, uuid_1.v4)();
            const refreshToken = await jwtServices_1.default.create({ uuid, type: result.role });
            const accessToken = await jwtServices_1.default.create({ userId: result.id, type: result.role }, "5m");
            service_1.default.add(result.id, String(uuid));
            return res.status(201).send({ msg: "User registered successfully", accessToken, refreshToken });
        }
        else {
            return res.status(200).send({ msg: "Failed!" });
        }
    }
    catch (error) {
        console.log(error);
    }
    //return next();
});
const login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ msg: "Fields Missing" });
    }
    const user = await service_1.default.login(email);
    if (user) {
        if (user.role !== 'Air_Port_Manager') {
            const isActiveAirLine = await service_2.default.getOne(String(user.airLine.id));
            if (!isActiveAirLine.isActive) {
                return res.status(400).send({ msg: "Air Line currently inActive!" });
            }
        }
        const validatePassword = await service_1.default.validatePassword(password, user.password);
        if (validatePassword) {
            res.status(200).send({
                msg: "Login Successfully",
                data: user,
            });
        }
        else {
            res.status(401).send({
                msg: "Invalid Credentials!",
            });
        }
    }
    else {
        res.status(401).send({
            msg: "Invalid Credentials!",
        });
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
        return res.status(200).send({ msg: "User", data: result });
    }
    else {
        return res.status(404).send({ msg: "Not Found" });
    }
    //return next();
});
const update = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = updateProfile.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const result = await service_1.default.update(String(req.body.id), req.body);
    console.log(result);
    if (result.affected) {
        return res.status(200).send({ msg: "Profile Updated" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
    // return next();
});
const sendOtp = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = requestOtp.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const otp = (0, OTP_1.default)();
    const result = await service_1.default.requestOtp(Number(otp), String(req.body.email));
    if (result) {
        return res.status(200).send({ msg: "OTP sent" });
    }
    else {
        return res.status(400).send({ msg: "OTP not sent" });
    }
});
const verifyOtp = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = verifyOtpBody.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const isValidateExpireOtp = await service_1.default.otpExpiryValidation(String(req.body.email));
    if (!isValidateExpireOtp) {
        return res.status(400).send({ msg: "OTP expire please try again" });
    }
    const isValidOtp = await service_1.default.isValidOtp(Number(req.body.otp), String(req.body.email));
    if (isValidOtp.affected) {
        return res.status(200).send({ msg: "OTP Verified" });
    }
    else {
        return res.status(400).send({ msg: "OTP invalid!" });
    }
});
const resetPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = resetPasswordBody.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const { id, password } = req.body;
    const result = await service_1.default.resetPassword(String(id), String(password));
    if (result.affected) {
        return res.status(200).send({ msg: "Password has been changed successfully" });
    }
    else {
        return res.status(400).send({ msg: "Failed!" });
    }
});
const forgotPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { error } = forgotPasswordBody.validate(req.body);
    if (error) {
        return next(new appError_1.default(error.details[0].message, 400));
    }
    const { email, password } = req.body;
    const result = await service_1.default.forgotPassword(email, password);
    if (result.affected) {
        return res.status(200).send({ msg: "Password Updated successfully" });
    }
    else {
        return res.status(400).send({ msg: "Password not Updated" });
    }
});
const deleteUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const result = await service_1.default.delete(String(req.query.id));
    if (result.affected === 0) {
        return res.status(404).send({ msg: "Not Found!" });
    }
    if (result) {
        return res.status(400).send({
            msg: "deleted"
        });
    }
    else {
        return res.status(400).send({ msg: "failed" });
    }
});
const refreshToken = (0, express_async_handler_1.default)(async (req, res) => {
    const { refreshToken } = req.body;
    const verifyToken = await jwtServices_1.default.authenticate(refreshToken);
    if (verifyToken) {
        const { uuid, type, } = verifyToken;
        const AuthId = await service_1.default.findByUUID(String(uuid));
        if (AuthId) {
            const { userId } = AuthId;
            if (userId) {
                const accessToken = await jwtServices_1.default.create({ userId, type }, "5m");
                res.status(200).send({ msg: "access Token", data: { accessToken } });
            }
            else {
                res.status(401).send({ msg: "Login please" });
            }
        }
        else {
            res.status(401).send({ msg: "Login please" });
        }
    }
    else {
        res.status(401).send({ msg: "Login please" });
    }
});
exports.default = { create, getAll, getOne, update, deleteUser, sendOtp, verifyOtp, resetPassword, forgotPassword, login, refreshToken };
