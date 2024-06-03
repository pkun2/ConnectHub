import Post from "../model/Post";

export const getWriteController = (req, res) => {
    res.send("글쓰기 페이지 입니다.");
}

export const postWriteController = (req, res) => {
    const { userId, categoryId, title, content } = req.body; // Request Body에서 userId, categoryId, title, content 추출
    Post.insertPost(userId, categoryId, title, content, (err, result) => {
        if (err) {// 삽입중 오류 발생시
            res.status(500).send('Error creating post'); // 500: Internal Server Error
            return;
        }
        res.status(200).send('Post created successfully'); // 200: OK
    });
}
