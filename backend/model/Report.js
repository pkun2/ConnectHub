import pool from '../config/db.js';

class Report {
    static async insertReport(type, targetId, content) {
        const query = 'INSERT INTO reports (type, targetId, content) VALUES (?, ?, ?)';
        const values = [type, targetId, content];
        try {
            const [result] = await pool.query(query, values);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default Report;
