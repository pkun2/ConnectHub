import pool from "../config/db.js"

class Post {
    // 게시글 삽입
    static async insertPost(userId, categoryId, title, content) {
        const query = 'INSERT INTO posts (userId, categoryId, title, content) VALUES (?, ?, ?, ?)';
        const values = [userId, categoryId, title, content];
        try {
            const [result] = await pool.query(query, values);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // 모든 게시글 조회
    static async getAllPosts(limit) {
        const query = 'SELECT * FROM posts LIMIT ?';
        const params = [parseInt(limit, 10)];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // 카테고리별 게시글 조회
    static async getPostByCategoryId(categoryId, limit) {
        const query = 'SELECT * FROM posts WHERE categoryId = ? LIMIT ?';
        const params = [categoryId, parseInt(limit, 10)];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getPostByPostId(postId) {
        const query = "SELECT * FROM posts WHERE postId = ?";
        const params = [postId];

        try {
            const [result] = await pool.query(query, params);
            return result[0];
        }
        catch (err) {
            throw err;
        }
    }
}

export default Post;
