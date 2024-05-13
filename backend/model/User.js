import db from '../config/db.js';

class User {
    constructor({ userId, nickname, email, password }) {
        this.userId = userId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    async save(callback) {
        const sql = 'INSERT INTO users (userId, nickname, email, password) VALUES (?, ?, ?, ?)';
        const values = [this.userId, this.nickname, this.email, this.password];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('회원가입 중 오류 발생:', err);
                callback(err, null);
                return;
            }
            console.log('회원가입이 성공적으로 처리되었습니다.');
            callback(null, result);
        });
    }
}

export default User;
