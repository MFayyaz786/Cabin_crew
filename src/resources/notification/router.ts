// notification.routes.js
import express from 'express';
const router = express.Router();
import notificationController from './controller';
// Create a new notification
router.post('/', notificationController.createNotification);

// Get all notifications
router.get('/', notificationController.getAllNotifications);

// Get a single notification by ID
router.get('/:id', notificationController.getNotificationById);

// Update a notification by ID
router.patch('/:id', notificationController.updateNotificationById);

// Delete a notification by ID
router.delete('/:id', notificationController.deleteNotificationById);

export default router;
