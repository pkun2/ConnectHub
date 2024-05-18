import Post from "../model/Post";

export const getWriteController = (req, res) => {
    res.send("글쓰기 페이지 입니다.");
}

export const postWriteController = (req, res) => {
    const { userId, categoryId, title, content } = req.body; // Request Body에서 userId, categoryId, title, content 추출
    Post.insertPost(userId, categoryId, title, content)
        .then(result => {
            // 삽입 성공시
            res.status(200).send('게시글이 성공적으로 생성되었습니다.', result); // 200: OK
            
        })
        .catch(err => {
            // 삽입중 오류 발생시
            res.status(500).send('게시글 생성중 오류발생', err); // 500: Internal Server Error
        });
}

export const postViewController = (req, res) => {
    const { userId, categoryId, limit} = req.body; // Request Body에서 userId, categoryId, limit 추출
    // 게시글 조회
    const fetchPost = categoryId 
        ?Post.getPostByCategoryId(categoryId, limit) 
        :Post.getAllPosts(limit);

    fetchPost
        .then(posts => {
            // 조회 성공시
            res.status(200).send("게시글 조회 성공:", posts);
        })
        .catch(err => {
            // 조회중 오류 발생시
            res.status(500).send("게시글 조회중 오류 발생:", err);
        });

}