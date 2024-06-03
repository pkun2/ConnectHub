import Notification from '../model/Notification.js';
import UserSetting from '../model/UserSetting.js';

// 알림 기능 
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


// 알림 설정 기능 
export const updateUserSettings = async (req, res) => {
    const userId = req.params.userId;
    const settings = req.body;

    try {
        await UserSetting.update(userId, settings);
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Settings update error:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
};

export const getUserSettings = async (req, res) => {
    const userId = req.params.userId;

    try {
        const settings = await UserSetting.getSettings(userId);
        res.status(200).json(settings);
    } catch (error) {
        console.error('Settings retrieval error:', error);
        res.status(500).json({ error: 'Failed to get settings' });
    }
};
