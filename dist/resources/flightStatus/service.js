"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flightStatus_1 = __importDefault(require("../../entities/flightStatus"));
const typeorm_1 = require("typeorm");
const statusRepo = (0, typeorm_1.getRepository)(flightStatus_1.default);
const service = {
    create: async (statusDate) => {
        const user = statusRepo.create(statusDate);
        await statusRepo.save(user);
        return user;
    },
    getAll: async () => {
        const result = await statusRepo.find({ where: { deleted: false } });
        return result;
    },
    getOne: async (id) => {
        const status = await statusRepo.findOneBy({ id });
        return status;
    },
    getByStatus: async () => {
        const status = await statusRepo.findOne({ where: { status: "On-Time" } });
        console.log(status);
        return status;
    },
    update: async (id, statusDate) => {
        const result = await statusRepo.update({ id }, statusDate);
        return result;
    },
    delete: async (id) => {
        const result = await statusRepo.update({ id }, { deleted: true });
        return result;
    },
};
exports.default = service;
