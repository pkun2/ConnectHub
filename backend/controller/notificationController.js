import Notification from '../model/Notification.js';

export const createNotification = async (req, res) => {
    const notification = req.body;

    try {
        const notificationId = await Notification.create(notification);
        res.status(201).json({ notificationId, message: 'Notification created successfully' });
    } catch (error) {
        console.error('Notification creation error:', error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

export const getNotifications = async (req, res) => {
    const userId = req.params.userId;

    try {
        const notifications = await Notification.getNotifications(userId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Notifications retrieval error:', error);
        res.status(500).json({ error: 'Failed to get notifications' });
    }
};

export const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.notificationId;

    try {
        await Notification.markAsRead(notificationId);
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Notification marking as read error:', error);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};
