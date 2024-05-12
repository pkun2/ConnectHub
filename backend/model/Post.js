import db from '../config/db.js';

class Post {
    static insertPost(userId, categoryId, title, content, callback) {
        const sql = 'INSERT INTO posts (userId, categoryId, title, content) VALUES (?, ?, ?, ?)';
        const values = [userId, categoryId, title, content];
        
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('게시글 삽입중 오류 발생:', err);
                callback(err, null);
                return;
            }
            callback(null, result);
            console.log('게시글이 생성되었습니다');
        });
    }
}

export default Post;