"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const service_1 = __importDefault(require("./service"));
const appError_1 = __importDefault(require("../../utils/appError"));
const validator_1 = __importDefault(require("./validator"));
const service_2 = __importDefault(require("../user/service"));
const sendNotification_1 = __importDefault(require("../../utils/sendNotification"));
const { addNew, update } = validator_1.default;
// Create a new notification
const createNotification = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { error } = addNew.validate(req.body);
        if (error) {
            return next(new appError_1.default(error.details[0].message, 400));
        }
        const notification = await service_1.default.createNotification(req.body);
        return res.status(201).send({ msg: "Notification", data: notification });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
// Get all notifications
const getAllNotifications = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const notifications = await service_1.default.getAllNotifications(req.query.fromDate, req.query.toDate);
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
// send notification
const sendNotification = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const notifications = await service_1.default.getNotificationById(req.params.id);
        if (notifications.isSent) {
            return res.status(400).send({ msg: "Already Sent" });
        }
        const sendUser = await service_2.default.sendToList(notifications.deliverTo);
        if (sendUser.length === 0) {
            return res.status(400).send({ msg: "User list empty" });
        }
        const isSent = await (0, sendNotification_1.default)(notifications.notification, sendUser.deliverTo);
        if (!isSent) {
            return res.status(400).send({ msg: "Failed!" });
        }
        res.json({ msg: "Notification Sent" });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
// Get a single notification by ID
const getNotificationById = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const notification = await service_1.default.getNotificationById(req.params.id);
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        res.json(notification);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
// Update a notification by ID
const updateNotificationById = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { error } = update.validate(req.body);
        if (error) {
            return next(new appError_1.default(error.details[0].message, 400));
        }
        const notification = await service_1.default.updateNotificationById(req.params.id, req.body);
        if (!notification.affected) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        res.json({ msg: "Notification Updated" });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
// Delete a notification by ID
const deleteNotificationById = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const notification = await service_1.default.deleteNotificationById(req.params.id);
        if (!notification.affected) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        res.json({ msg: "Deleted" });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.default = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotificationById,
    deleteNotificationById,
    sendNotification
};
