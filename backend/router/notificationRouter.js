import express from 'express';
import { createNotification, getNotifications, markNotificationAsRead } from '../controller/notificationController.js';

const router = express.Router();

router.post('/', createNotification);
router.get('/:userId', getNotifications);
router.put('/read/:notificationId', markNotificationAsRead);

export default router;
