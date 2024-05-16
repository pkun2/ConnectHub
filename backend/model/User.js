import db from '../config/db.js';

class User {
    constructor({ userId, nickname, phone, password }) {
        // 사용자 객체 생성자 함수
        this.userId = userId;       // 사용자 ID
        this.nickname = nickname;   // 사용자 닉네임
        this.phone = phone;         // 사용자 전화번호
        this.password = password;   // 사용자 비밀번호
    }

    async save() {
        // SQL 쿼리문 생성, 전달 
        const sql = 'INSERT INTO users (userId, nickname, phone, password) VALUES (?, ?, ?, ?)';
        const values = [this.userId, this.nickname, this.phone, this.password];

        try { // 쿼리 실행 및 결과 반환
            const [result] = await db.promise().query(sql, values);
            return result;
        } catch (err) { // 오류 발생 
            console.error('사용자 등록 중 오류 발생:', err);
            throw err;
        }
    }
}

export default User;
