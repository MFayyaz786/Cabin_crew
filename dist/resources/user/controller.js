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
const validator_1 = __importDefault(require("./validator"));
const service_1 = __importDefault(require("./service"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../utils/appError"));
//* createUser
const create = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validator_1.default.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const user = yield service_1.default.create(req.body);
    return user ? res.status(201).json(user) : res.status(500).json({ error: "User creation failed" });
}));
//* getAll
const getAll = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield service_1.default.getAll(req.query);
    return res.status(200).json(users);
}));
//* getOne
const getOne = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield service_1.default.getOne(req.params.id);
    return user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
}));
//* update
const update = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield service_1.default.update(req.params.id, req.body, next);
    if (!user) {
        throw next(new appError_1.default("User update failed", 500, true));
    }
    return user ? res.status(200).json(user) : res.status(500).json({ error: "User update failed" });
}));
//* delete
const deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const success = yield service_1.default.delete(req.params.id);
    return success ? res.status(200).json({ message: "User deleted" }) : res.status(404).json({ error: "User not found" });
}));
exports.default = { create, getAll, getOne, update, deleteUser };
