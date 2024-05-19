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
            res.status(500).send('게시글 생성중 오류발생: ' + err.message); // 500: Internal Server Error
        });
}

export const postViewController = (req, res) => {
    const { categoryId, limit } = req.query; // Request Params에서 userId, categoryId, limit 추출
    // 게시글 조회
    const fetchPost = categoryId 
        ? Post.getPostByCategoryId(categoryId, limit) 
        : Post.getAllPosts(limit);

    fetchPost
        .then(posts => {
            // 조회 성공시
            res.status(200).json(posts);
        })
        .catch(err => {
            // 조회중 오류 발생시
            res.status(500).send("게시글 조회중 오류 발생: " + err.message);
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
            res.status(500).send("게시글 조회중 오류 발생: " + err.message);
        });
}


// 게시글 신고 기능 
export const postReportController = async (req, res) => {
    const postId = req.params.id; // 게시물의 ID를 파라미터로부터 가져옴
    try {
        const result = await Post.reportPost(postId); // 게시물 신고 기능 실행
        res.status(200).json(result); // 성공 시 결과를 JSON 형태로 반환
    } catch (error) {
        console.error('게시글 신고 도중 오류가 발생했습니다:', error);
        res.status(500).send('게시글 신고 도중 오류가 발생했습니다.');
    }
};
