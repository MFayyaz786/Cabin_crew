"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const device_1 = __importDefault(require("../../entities/device"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const deviceRepo = (0, typeorm_1.getRepository)(device_1.default);
const service = {
    create: async (deviceData) => {
        const salt = await bcrypt_1.default.genSalt(10);
        deviceData.password = await bcrypt_1.default.hash(deviceData.password, salt);
        const user = deviceRepo.create(deviceData);
        await deviceRepo.save(user);
        return user;
    },
    getAll: async (query) => {
        const result = await deviceRepo.find({ where: { deleted: false } });
        return result;
    },
    getOne: async (id) => {
        const user = await deviceRepo.findOneBy({ id });
        return user;
    },
    update: async (id, deviceData) => {
        const result = await deviceRepo.update({ id }, deviceData);
        console.log("result is", result);
        return result;
    },
    delete: async (id) => {
        const result = await deviceRepo.update({ id }, { deleted: true });
        return result;
    }
};
exports.default = service;
