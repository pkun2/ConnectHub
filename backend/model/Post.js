import pool from '../config/db.js';

class Post {
    static async insertPost(userId, categoryId, title, content) {
        const connection = await pool.getConnection();
        try {
            const query = 'INSERT INTO posts (userId, categoryId, title, content) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query(query, [userId, categoryId, title, content]);
            return result;
        } catch (err) {
            console.log("삽입중 에러발생:", err);
            throw err;
        } finally {
            connection.release();
        }
    }

    static async getAllPosts(limit) {
        const connection = await pool.getConnection();
        try {
            const query = "SELECT * FROM posts LIMIT ?";
            const [result] = await connection.query(query, [parseInt(limit)]);
            return result;
        } catch (err) {
            console.log("조회중 에러발생:", err);
            throw err;
        } finally {
            connection.release();
        }
    }

    static async getPostByCategoryId(categoryId, limit) {
        const connection = await pool.getConnection();
        try {
            const query = "SELECT * FROM posts WHERE categoryId = ? LIMIT ?";
            const [result] = await connection.query(query, [categoryId, parseInt(limit)]);
            return result;
        } catch (err) {
            console.log("조회중 에러발생:", err);
            throw err;
        } finally {
            connection.release();
        }
    }

    static async getPostDetail(postId) {
        const connection = await pool.getConnection();
        try {
            const query = "SELECT * FROM posts WHERE postId = ?";
            const [result] = await connection.query(query, [postId]);
            return result;
        } catch (err) {
            console.log("조회중 에러발생:", err);
            throw err;
        } finally {
            connection.release();
        }
    }

    // 게시글 신고 기능, 신고 횟수 누적되는 방식 
    static async reportPost(postId) {
        const connection = await pool.getConnection();
        try {
            const query = "UPDATE posts SET reportCount = reportCount + 1 WHERE id = ?";
            const [result] = await connection.query(query, [postId]);
            return result;
        } catch (err) {
            console.log("게시글 신고 중 에러 발생:", err);
            throw err;
        } finally {
            connection.release();
        }
    }

    
}

export default Post;
