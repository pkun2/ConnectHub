import db from '../config/db.js';

class User {
    constructor({ email, nickname, phoneNum, password }) {
        this.email = email;
        this.nickname = nickname;
        this.phoneNum = phoneNum;
        this.password = password;
    }

    async save() {
        const sql = 'INSERT INTO users (email, nickname, phoneNum, password) VALUES (?, ?, ?, ?)';
        const values = [this.email, this.nickname, this.phoneNum, this.password];

        try {
            const [result] = await db.query(sql, values);
            return result;
        } catch (err) {
            console.error('사용자 등록 중 오류 발생:', err);
            throw err;
        }
    }
}

export default User;
