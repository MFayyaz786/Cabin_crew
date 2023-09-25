"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const userSessionMode_1 = require("../../entities/userSessionMode");
const userSessionServices = {
    create: async (whatsApp, verificationId) => {
        try {
            const userSessionRepository = (0, typeorm_1.getRepository)(userSessionMode_1.UserSessionEntity);
            const result = userSessionRepository.create({ whatsApp, verificationId });
            await userSessionRepository.save(result);
            return result;
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to create user session");
        }
    },
    updateSession: async (whatsApp, session) => {
        try {
            const userSessionRepository = (0, typeorm_1.getRepository)(userSessionMode_1.UserSessionEntity);
            const result = await userSessionRepository.findOne({
                where: { whatsApp },
            });
            if (result) {
                result.session = session;
                await userSessionRepository.save(result);
            }
            return result;
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to update user session");
        }
    },
    getByWhatsApp: async (whatsApp) => {
        try {
            const userSessionRepository = (0, typeorm_1.getRepository)(userSessionMode_1.UserSessionEntity);
            const result = await userSessionRepository.findOne({
                where: { whatsApp },
            });
            return result;
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to retrieve user session");
        }
    },
};
exports.default = userSessionServices;
