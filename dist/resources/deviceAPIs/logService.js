"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deviceAPILog_1 = __importDefault(require("../../entities/deviceAPILog"));
const typeorm_1 = require("typeorm");
const deviceApiLogRepo = (0, typeorm_1.getRepository)(deviceAPILog_1.default);
const deviceApiLogService = {
    new: async (path, request) => {
        const logs = deviceApiLogRepo.create({ path, request });
        await deviceApiLogRepo.save(logs);
        return logs;
    },
    updateResponse: async (id, response) => {
        const result = await deviceApiLogRepo.update({ id }, { response });
        return result;
    },
};
exports.default = deviceApiLogService;
