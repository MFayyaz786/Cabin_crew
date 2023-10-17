"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const typeorm_1 = require("typeorm");
const airlineType_1 = __importDefault(require("../../entities/airlineType"));
const flightStatus_1 = __importDefault(require("../../entities/flightStatus"));
const statusRepo = (0, typeorm_1.getRepository)(flightStatus_1.default);
const AirlineTypeRepo = (0, typeorm_1.getRepository)(airlineType_1.default);
exports.service = {
    getAll: async () => {
        const result = await AirlineTypeRepo.find({ where: { deleted: false, isActive: true } });
        return result;
    },
    getOne: async (id) => {
        const user = await AirlineTypeRepo.findOne({ where: { id: id } });
        return user;
    },
    add: async (data) => {
        console.log(data);
        const result = AirlineTypeRepo.create(data);
        await AirlineTypeRepo.save(result);
        return result;
    },
    update: async (id, body) => {
        const result = await AirlineTypeRepo.update({ id }, body);
        return result;
    },
    delete: async (id) => {
        const result = await AirlineTypeRepo.update({ id }, { deleted: true });
        return result;
    }
};
exports.default = exports.service;
