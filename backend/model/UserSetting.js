import db from '../config/db.js';

class UserSetting {
    constructor({ userId, newPostNotificationEnabled, newCommentNotificationEnabled }) {
        this.userId = userId;
        this.newPostNotificationEnabled = newPostNotificationEnabled;
        this.newCommentNotificationEnabled = newCommentNotificationEnabled;
    }

    static async update(userId, settings) {
        const sql = `
            UPDATE user_settings
            SET newPostNotificationEnabled = ?, newCommentNotificationEnabled = ?
            WHERE userId = ?
        `;
        const values = [
            settings.newPostNotificationEnabled,
            settings.newCommentNotificationEnabled,
            userId
        ];

        try {
            const [result] = await db.query(sql, values);
            return result;
        } catch (err) {
            console.error('Settings update error:', err);
            throw err;
        }
    }

    static async getSettings(userId) {
        const sql = 'SELECT * FROM user_settings WHERE userId = ?';

        try {
            const [rows] = await db.query(sql, [userId]);
            return rows[0];
        } catch (err) {
            console.error('Settings retrieval error:', err);
            throw err;
        }
    }
}

export default UserSetting;
