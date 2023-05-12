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
exports.service = void 0;
const user_1 = __importDefault(require("../entities/user"));
const typeorm_1 = require("typeorm");
const userRepo = (0, typeorm_1.getRepository)(user_1.default);
exports.service = {
    create: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const users = userRepo.create(userData);
        yield userRepo.save(users);
        return users;
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userRepo.find();
        return result;
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepo.findOne({ where: { id: id } });
        return user;
    }),
    update: (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userRepo.update({ id }, userData);
        return result;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userRepo.delete({ id });
        console.log("result is", result);
        return result;
    })
};
exports.default = exports.service;
