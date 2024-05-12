import db from '../config/db.js';

class Post {
    static insertPost(userId, categoryId, title, content) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO posts (userId, categoryId, title, content) VALUES (?, ?, ?, ?)';
            const values = [userId, categoryId, title, content];
        
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('게시글 삽입중 오류 발생:', err);
                    reject(err);
                    return;
                }
                resolve(result);
                console.log('게시글이 생성되었습니다');
            });
        });
    }

    static getAllPosts() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM posts';
            db.query(sql, (err, result) => {
                if (err) {
                    console.error('게시글 조회중 오류 발생:', err);
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
}

export default Post;