import connectToDatabase from '../config/db.js';

class Post {
    static async insertPost(userId, categoryId, title, content) {
        const connection = await connectToDatabase();
        try {
            const query = 'INSERT INTO posts (userId, categoryId, title, content) VALUES (?, ?, ?, ?)';
            const [result] = await connection.query(query, [userId, categoryId, title, content]);
            return result;
        } catch (err) {
            console.log("삽입중 에러발생:", err);
            throw err;
        } finally {
            connection.end();
        }
    }

    static async getAllPosts(limit) {
        const connection = await connectToDatabase();
        try {
            const query = "SELECT * FROM posts LIMIT ?";
            const [result] = await connection.query(query, [parseInt(limit)]);
            return result;
        } catch (err) {
            console.log("조회중 에러발생:", err);
            throw err;
        } finally {
            connection.end();
        }
    }

    static async getPostByCategoryId(categoryId, limit) {
        const connection = await connectToDatabase();
        try {
            const query = "SELECT * FROM posts WHERE categoryId = ? LIMIT ?";
            const [result] = await connection.query(query, [categoryId, parseInt(limit)]);
            return result;
        } catch (err) {
            console.log("조회중 에러발생:", err);
            throw err;
        } finally {
            connection.end();
        }
    }

    static async getPostById(postId) {
        const connection = await connectToDatabase();
        try {
            const query = "SELECT * FROM posts WHERE postId = ?";
            const [result] = await connection.query(query, [postId]);
            return result;
        } catch (err) {
            console.log("조회중 에러발생:", err);
            throw err;
        } finally {
            connection.end();
        }
    }
}

export default Post;
