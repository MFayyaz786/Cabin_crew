"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// notification.service.js
const notification_1 = __importDefault(require("../../entities/notification"));
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const service = {
    // Create a new notification
    createNotification: async (notificationData) => {
        const notificationRepo = (0, typeorm_1.getRepository)(notification_1.default);
        const data = notificationRepo.create(notificationData);
        return await notificationRepo.save(data);
    },
    // Get all notifications
    getAllNotifications: async (fromDate, toDate) => {
        toDate = (0, moment_1.default)(toDate).endOf('day').format("YYYY-MM-DD HH:mm:ss");
        console.log("date", toDate);
        const notificationRepo = (0, typeorm_1.getRepository)(notification_1.default);
        return await notificationRepo.query(`SELECT id,"notification","intensity","status","createdDate","isSent","deliverTo"
FROM notification
WHERE "createdDate" >= '${fromDate}'
AND "createdDate" <= '${toDate}' AND "deleted" = false;
`);
    },
    // Get a single notification by ID
    getNotificationById: async (notificationId) => {
        console.log("id", notificationId);
        const notificationRepo = (0, typeorm_1.getRepository)(notification_1.default);
        return await notificationRepo.findOne({ where: { id: notificationId } });
    },
    // Update a notification by ID
    updateNotificationById: async (notificationId, updatedData) => {
        const notificationRepo = (0, typeorm_1.getRepository)(notification_1.default);
        return await notificationRepo.update({ id: notificationId }, updatedData);
    },
    // Delete a notification by ID
    deleteNotificationById: async (notificationId) => {
        const notificationRepo = (0, typeorm_1.getRepository)(notification_1.default);
        return await notificationRepo.update({ id: notificationId }, { deleted: true });
    },
};
exports.default = service;
