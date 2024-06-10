import express from 'express';
import { createNotification, getNotifications, markNotificationAsRead, updateUserSettings, getUserSettings } from '../controller/notificationController.js';

const router = express.Router();

router.post('/', createNotification);
router.get('/:userId', getNotifications);
router.put('/read/:notificationId', markNotificationAsRead);

router.put('/settings/:userId', updateUserSettings);
router.get('/settings/read/:userId', getUserSettings);

export default router;