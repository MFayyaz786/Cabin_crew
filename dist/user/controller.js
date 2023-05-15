"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const service_1 = __importDefault(require("./service"));
const user_1 = __importDefault(require("../entities/user"));
const class_validator_1 = require("class-validator");
const create = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //     if (!req.body) {
    //     return res.status(400).send({ msg: "Bad request" });
    //   }
    const user = new user_1.default();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    const error = yield (0, class_validator_1.validate)(user);
    if (error.length > 0) {
        const errorMessages = error.map((error) => Object.values(error.constraints || {})).flat();
        console.log(error);
        return res.status(400).send({ msg: "Validation Failed!", errors: errorMessages });
    }
    const { name, email } = req.body;
    console.log(name, email);
    const result = yield service_1.default.create(req.body);
    if (result) {
        res.status(200).send({ msg: "success" });
    }
    else {
        res.status(200).send({ msg: "success" });
    }
    return next();
}));
const getAll = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.default.getAll();
    res.status(200).send({ msg: "list", data: result });
    return next();
}));
const getOne = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const number :id=req.query
    // const id = parseInt(req.query.id as string);
    const result = yield service_1.default.getOne(Number(req.query.id));
    if (result) {
        res.status(200).send({ msg: "user", data: result });
    }
    else {
        res.status(404).send({ msg: "Not Found" });
    }
    return next();
}));
const update = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //     if (!req.body) {
    //     return res.status(400).send({ msg: "Bad request" });
    //   }
    const { name, email } = req.body;
    console.log(name, email);
    const result = yield service_1.default.update(Number(req.body.id), req.body);
    if (result) {
        res.status(200).send({ msg: "success" });
    }
    else {
        res.status(200).send({ msg: "success" });
    }
    return next();
}));
const deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.default.delete(Number(req.query.id));
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
    return next();
}));
exports.default = { create, getAll, getOne, update, deleteUser };
