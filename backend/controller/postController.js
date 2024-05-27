import Post from "../model/Post";

export const getWriteController = (req, res) => {
    res.send("글쓰기 페이지 입니다.");
}

export const postWriteController = (req, res) => {
    const { userId, categoryId, title, content } = req.body; // Request Body에서 userId, categoryId, title, content 추출
    Post.insertPost(userId, categoryId, title, content)
        .then(result => {
            // 삽입 성공시
            res.status(200).json(result); // 200: OK
            
        })
        .catch(err => {
            // 삽입중 오류 발생시
            res.status(500).send('게시글 생성중 오류발생', err); // 500: Internal Server Error
        });
}

export const postViewController = (req, res) => {
    const { categoryId, limit} = req.query; // Request Params에서 userId, categoryId, limit 추출
    // 게시글 조회
    const fetchPost = categoryId 
        ?Post.getPostByCategoryId(categoryId, limit) 
        :Post.getAllPosts(limit);

    fetchPost
        .then(posts => {
            // 조회 성공시
            res.status(200).json(posts);
        })
        .catch(err => {
            // 조회중 오류 발생시
            res.status(500).send("게시글 조회중 오류 발생:", err);
        });

}

export const deletePostController = (req, res) => {
    const { userId, postId } = req.body; // Request Body에서 postId 추출

    if (userId !== 1/* 게시글 작성자와 요청자가 다른 경우 */) {
        res.status(403).send('삭제 권한이 없습니다.');
        return;
    } else {
        Post.deletePost(postId)
        .then(result => {
            console.log(result);
            if (result.affectedRows > 0) {
                res.status(200).send('게시글이 성공적으로 삭제되었습니다.');
            } else {
                res.status(404).send('삭제할 게시글을 찾을 수 없습니다.');
            }
        })
        .catch(err => {
            res.status(500).send('게시글 삭제중 오류 발생');
        });
    }
export const getPostDetailController = (req, res) => {
    const postId = req.params.id; // Request Parameter에서 postId 추출
    Post.getPostDetail(postId)
        .then(post => {
            // 조회 성공시
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).send("해당하는 게시글을 찾을 수 없습니다.");
            }
        })
        .catch(err => {
            // 조회중 오류 발생시
            res.status(500).send("게시글 조회중 오류 발생:", err);
        });
}