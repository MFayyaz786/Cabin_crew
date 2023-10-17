"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const flight_1 = __importDefault(require("../../entities/flight"));
const flightRepo = (0, typeorm_1.getRepository)(flight_1.default);
const service = {
    create: async (userDate) => {
        const user = flightRepo.create(userDate);
        await flightRepo.save(user);
        return user;
    },
    getAll: async () => {
        const result = await flightRepo.find({ where: { deleted: false, isActive: true }, relations: ["createdBy", "airLine"] });
        return result;
    },
    getFlightByAirLine: async (airLine) => {
        console.log(airLine);
        const options = {
            where: { airLine: { id: airLine }, deleted: false, isActive: true },
            relations: ["createdBy", "airLine", "updatedBy"]
        };
        const result = await flightRepo.find(options);
        return result;
    },
    getOne: async (id) => {
        const user = await flightRepo.findOne({ where: { id: id }, relations: ["createdBy", "airLine"] });
        return user;
    },
    update: async (id, userData) => {
        const result = await flightRepo.update({ id }, userData);
        console.log("result is", result);
        return result;
    },
    updateFlightStatus: async (id, userData) => {
        const result = await flightRepo.update({ id }, userData);
        console.log("result is", result);
        return result;
    },
    delete: async (id) => {
        const result = await flightRepo.update({ id }, { deleted: true });
        return result;
    }
};
exports.default = service;
