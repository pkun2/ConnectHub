import db from '../config/db.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt'; // bcrypt 모듈 추가

class User {
    constructor({ userId, nickname, email, password, isActive = false, verificationToken = null }) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.isActive = isActive; // 추가된 isActive 필드
        this.verificationToken = verificationToken;
    }

    async save() {
        // userId 중복 체크
        const isDuplicate = await this.checkDuplicateUserId();
        if (isDuplicate) {
            throw new Error('중복된 userId입니다.');
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const sql = 'INSERT INTO users (userId, nickname, email, password, isActive, verificationToken) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [this.userId, this.nickname, this.email, hashedPassword, this.isActive, this.verificationToken];

        try {
            const [result] = await db.promise().query(sql, values);
            return result;
        } catch (err) {
            console.error('회원가입 중 오류 발생:', err);
            throw err;
        }
    }

    async checkDuplicateUserId() {
        const sql = 'SELECT COUNT(*) AS count FROM users WHERE userId = ?';
        try {
            const [rows] = await db.promise().query(sql, [this.userId]);
            const count = rows[0].count;
            return count > 0;
        } catch (err) {
            console.error('userId 중복 체크 중 오류 발생:', err);
            throw err;
        }
    }

    async saveVerificationToken() {
        const token = crypto.randomBytes(20).toString('hex');
        const sql = 'INSERT INTO email_verifications (email, token) VALUES (?, ?)';
        try {
            const [result] = await db.promise().query(sql, [this.email, token]);
            return token;
        } catch (err) {
            console.error('인증 토큰 저장 중 오류 발생:', err);
            throw err;
        }
    }

    static async findByToken(token) {
        const sql = 'SELECT * FROM email_verifications WHERE token = ?';
        try {
            const [rows] = await db.promise().query(sql, [token]);
            return rows[0];
        } catch (err) {
            console.error('토큰으로 사용자 조회 중 오류 발생:', err);
            throw err;
        }
    }

    static async activateUser(userId) {
        const sql = 'UPDATE users SET isActive = 1 WHERE userId = ?';
        try {
            const [result] = await db.promise().query(sql, [userId]);
            return result;
        } catch (err) {
            console.error('사용자 활성화 중 오류 발생:', err);
            throw err;
        }
    }

    // user.js 파일에 추가
    static async create(userData) {
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
