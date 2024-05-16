import db from '../config/db.js';
import bcrypt from 'bcrypt';

class User {
    constructor({ userId, nickname, phone, password }) {
        // 사용자 객체 생성자 함수
        this.userId = userId;       // 사용자 ID
        this.nickname = nickname;   // 사용자 닉네임
        this.phone = phone;         // 사용자 전화번호
        this.password = password;   // 사용자 비밀번호
    }

    async save() {
        // bcrypt를 사용하여 비밀번호를 해싱. 
        // 두 번째 매개변수는 해싱에 사용되는 솔트(salt)의 길이
        const hashedPassword = await bcrypt.hash(this.password, 10);
        
        // SQL 쿼리문 생성, 전달 
        const sql = 'INSERT INTO users3 (userId, nickname, phone, password) VALUES (?, ?, ?, ?)';
        const values = [this.userId, this.nickname, this.phone, hashedPassword];

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
