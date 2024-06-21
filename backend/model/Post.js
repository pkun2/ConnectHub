import pool from '../config/db.js';

class Post {
    // 게시글 삽입
    static async insertPost(userId, categoryId, title, content, nickname) {
        const query = 'INSERT INTO posts (userId, categoryId, title, content, nickname) VALUES (?, ?, ?, ?, ?)';
        const values = [userId, categoryId, title, content, nickname];
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
    // 게시글 작성자 조회
    static async getUserIdByPostId(postId) {
        const query = `SELECT userId FROM posts WHERE postId = ?`;
        const params = [postId];
        try {
            const [result] = await pool.query(query, params);
            return result[0].userId;
        } catch (err) {
            throw err;
        }
    }

    // 게시글 상세 조회
    static async getPostDetail(postId) {
        const query = 'SELECT * FROM posts WHERE postId = ?';
        const params = [postId];
        try {
            const [result] = await pool.query(query, params);
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    // 게시글 삭제 기능
    static async deletePost(postId) {
        const query = 'DELETE FROM posts WHERE postId = ?';
        const params = [postId]

        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;

        }
    }

    // 게시글 변경 기능, content와 title의 내용이 수정되는 방식  
    static async updatePost(title, content, postId) {
        const connection = await pool.getConnection();
        try {
            const query = "UPDATE posts SET title = ?, content = ? WHERE postId = ?";
            const [result] = await connection.query(query, [title, content, postId]);
            return result;
        } catch (err) {
            console.log("게시글 업데이트 중 에러 발생:", err);
            throw err;
        } finally {
            connection.release();
        }
    }

    // 신고 기능 
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

    // 카테고리 이름 가져오기
    static async getCategoryNameByCategoryId (categoryId) {
        const query = 'SELECT categoryName FROM categories WHERE categoryId = ?';
        const values = [categoryId];
        try {
            const [result] = await pool.query(query, values);
            return result.length > 0 ? result[0].categoryName : null;
        } catch (err) {
            throw err;
        }
    }

    static async searchPostsByTitle(title) {
        const query = 'SELECT * FROM posts WHERE title LIKE ?';
        const params = [`%${title}%`];
        try {
            const [result] = await pool.query(query, params);
            return result;
        } catch (err) {
            throw err;
        }
    }
    
}

export default Post;
