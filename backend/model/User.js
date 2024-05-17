import db from '../config/db.js';

class User {
    constructor({ userId, nickname, phone, password }) {
        this.userId = userId;
        this.nickname = nickname;
        this.phone = phone;
        this.password = password;
    }

    async save() {
        const sql = 'INSERT INTO users (userId, nickname, phone, password) VALUES (?, ?, ?, ?)';
        const values = [this.userId, this.nickname, this.phone, this.password];

        try {
            const [result] = await db.promise().query(sql, values);
            return result;
        } catch (err) {
            console.error('사용자 등록 중 오류 발생:', err);
            throw err;
        }
    }
}

export default User;
