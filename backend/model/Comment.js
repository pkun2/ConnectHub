import pool from "../config/db.js"

class Comment {
    static async insertComment(postId, userId, content) {
        const query = 'INSERT INTO comments (userId, postId, content) VALUES (?, ?, ?)';
        const values = [userId, postId, content];
        try {
            const [result] = await pool.query(query, values);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getCommentsByPostId(postId) {
        const query = `SELECT comments.*, users.nickname
                       FROM comments
                       JOIN users ON comments.userId = users.userId
                       WHERE postId = ?`;
        const params = [postId];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async deleteComment(commentId) {
        const query = 'DELETE FROM comments WHERE commentId = ?';
        const values = [commentId];
        try {
            const [result] = await pool.query(query, values);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async updateComment(commentId, content) {
        const query = 'UPDATE comments SET content = ? WHERE commentId = ?';
        const values = [content, commentId];
        try {
            const [result] = await pool.query(query, values);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default Comment;