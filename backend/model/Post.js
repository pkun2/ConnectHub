import db from '../config/db.js';

class Post {
    static insertPost(userId, categoryId, title, content) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO posts (userId, categoryId, title, content) VALUES (?, ?, ?, ?)';// 게시글 삽입 쿼리
            const values = [userId, categoryId, title, content]; // 쿼리에 전달할 값
        
            db.query(query, values)// 쿼리 실행 부분
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    // 모든 게시글 조회
    static getAllPosts(limit) {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM posts LIMIT ?"; // 제한된 개수만큼 게시글 조회
            let params = [parseInt(limit, 10)] // limit을 param으로 사용하기 위해 정수로 변환

            db.query(query, params) // 쿼리 실행 부분
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    // 카테고리별 게시글 조회
    static getPostByCategoryId(categoryId, limit) {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM posts WHERE categoryId = ? LIMIT ?"; // categoryId에 해당하는 게시글 조회
            let params = [categoryId, parseInt(limit, 10)]; // categoryId와 limit을 param으로 사용하기 위해 정수로 변환 이때 categoryId는 전달시 정수로 전달되어야 함

            db.query(query, params) // 쿼리 실행 부분
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default Post;