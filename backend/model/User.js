import db from '../config/db.js';

class User {
    constructor({ userId, nickname, email, password }) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    async save(callback) {
        try {
            const sql = 'INSERT INTO users (userId, nickname, email, password) VALUES (?, ?, ?, ?)';
            const values = [this.userId, this.nickname, this.email, this.password];
            
            const result = await db.promise().query(sql, values);

            console.log('회원가입이 성공적으로 처리되었습니다.');
            if(callback) {
                callback(null, result);
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            if(callback) {
                callback(error, null);
            }
        }
    }
}

export default User;
