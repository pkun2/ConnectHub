import pool from "../config/db.js"

class Comment {
    // 댓글 삽입
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
    // 댓글 조회
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
    // 댓글 삭제
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
    // 댓글 수정
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