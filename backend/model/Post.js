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

    static deletePost(postId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM posts WHERE id = ?';
            db.query(query, [postId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Post;
