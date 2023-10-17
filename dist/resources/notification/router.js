"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// notification.routes.js
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = __importDefault(require("./controller"));
// Create a new notification
router.post('/', controller_1.default.createNotification);
// Get all notifications
router.get('/', controller_1.default.getAllNotifications);
// send notification
router.get('/send/:id', controller_1.default.sendNotification);
// Get a single notification by ID
router.get('/:id', controller_1.default.getNotificationById);
// Update a notification by ID
router.patch('/:id', controller_1.default.updateNotificationById);
// Delete a notification by ID
router.delete('/:id', controller_1.default.deleteNotificationById);
exports.default = router;
