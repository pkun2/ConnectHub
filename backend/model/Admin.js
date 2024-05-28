import pool from "../config/db";

class Admin {
    //admin 테이블에서 해당 유저정보가 있는지 확인하는 모델
    static async checkAdmin(userId) {
        const query = 'SELECT * FROM admins WHERE userId = ?';
        const params = [userId];
        try {
            const [result] = await pool.query(query, params);
            console.log(!result);
            return result;
        } catch (err) {
            throw err;
        }
    }
}


export default Admin;