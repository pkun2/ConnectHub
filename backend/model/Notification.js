import db from '../config/db.js';

class Notification {
    constructor({ userId, message, notificationType, sourceId }) {
        this.userId = userId;
        this.message = message;
        this.notificationType = notificationType;
        this.sourceId = sourceId;
    }

    static async create(notification) {
        const sql = `
            INSERT INTO notifications (userId, message, notificationType, sourceId)
            VALUES (?, ?, ?, ?)
        `;
        const values = [
            notification.userId,
            notification.message,
            notification.notificationType,
            notification.sourceId
        ];

        try {
            const [result] = await db.query(sql, values);
            return result.insertId;
        } catch (err) {
            console.error('Notification creation error:', err);
            throw err;
        }
    }

    static async getNotifications(userId) {
        const sql = 'SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC';

        try {
            const [rows] = await db.query(sql, [userId]);
            return rows;
        } catch (err) {
            console.error('Notifications retrieval error:', err);
            throw err;
        }
    }

    static async markAsRead(notificationId) {
        const sql = 'UPDATE notifications SET isRead = TRUE WHERE notificationId = ?';

        try {
            const [result] = await db.query(sql, [notificationId]);
            return result.affectedRows;
        } catch (err) {
            console.error('Notification marking as read error:', err);
            throw err;
        }
    }
}

export default Notification;
