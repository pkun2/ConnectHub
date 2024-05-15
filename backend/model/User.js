import db from '../config/db.js';
import bcrypt from 'bcrypt';

class User {
    constructor({ userId, nickname, email, password }) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const sql = 'INSERT INTO users (userId, nickname, email, password) VALUES (?, ?, ?, ?)';
        const values = [this.userId, this.nickname, this.email, hashedPassword];

        try {
            const [result] = await db.promise().query(sql, values);
            return result;
        } catch (err) {
            console.error('사용자 등록 중 오류 발생:', err);
            throw err;
        }
    }

    static async createUser(userData) {
        try {
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        } catch (err) {
            console.error('사용자 생성 중 오류 발생:', err);
            throw err;
        }
    }
}

export default User;
