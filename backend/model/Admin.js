import pool from "../config/db";

class Admin {
    //admin 테이블에서 해당 유저정보가 있는지 확인하는 모델
    static async checkAdmin(userId) {
        const query = 'SELECT * FROM admins WHERE userId = ?';
        const params = [userId];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }
    // 현재 날짜의 방문자가 없는 경우 방문자수를 추가하는 모델
    static async insertCountVisiter(today) {
        const query = 'INSERT INTO visits (visitDate) VALUES (?)';
        const params = [today];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }
    //방문자 수를 업데이트 하는 모델
    static async updateCountVisiter(today) {
        const query = 'UPDATE visits SET count = count + 1 WHERE visitDate = ?'; // 방문자수를 1 증가
        const params = [today];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }


    //오늘 방문자 수를 조회하는 모델    
    static async getCountVisiter(today) {
        const query = 'SELECT * FROM visits WHERE visitDate = ?';
        const params = [today];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }
    //총 방문자 수를 조회하는 모델
    static async getTotalVisiter() {
        const query = 'SELECT SUM(count) FROM visits';
        try {
            const [result] = await pool.query(query);
            return result;
        } catch (err) {
            throw err;
        }
    }
}


export default Admin;