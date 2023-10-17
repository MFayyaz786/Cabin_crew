"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booth_1 = __importDefault(require("../../entities/booth"));
const typeorm_1 = require("typeorm");
const boothRepo = (0, typeorm_1.getRepository)(booth_1.default);
const service = {
    create: async (userData) => {
        const user = boothRepo.create(userData);
        await boothRepo.save(user);
        return user;
    },
    getAll: async () => {
        const result = await boothRepo.find({ where: { deleted: false } });
        return result;
    },
    getOne: async (id) => {
        const user = await boothRepo.findOneBy({ id });
        return user;
    },
    update: async (id, userData) => {
        const result = await boothRepo.update({ id }, userData);
        console.log("result is", result);
        return result;
    },
    delete: async (id) => {
        const result = await boothRepo.update({ id }, { deleted: true });
        return result;
    },
    getAssignedAll: async () => {
        const query = `select * from booth where "isAssigned"=true AND "deleted"=false`;
        const connection = (0, typeorm_1.getConnection)();
        const result = await connection.query(query);
        return result;
    }
};
exports.default = service;
