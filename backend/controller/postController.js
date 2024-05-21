import Post from '../model/Post.js';
import logger from '../config/logger';

export const getWriteController = (req, res) => {
    res.send("글쓰기 페이지 입니다.");
};

export const postWriteController = async (req, res) => {
    const { userId, categoryId, title, content } = req.body; // Request Body에서 userId, categoryId, title, content 추출
    try {
        const result = await Post.insertPost(userId, categoryId, title, content);
        // 삽입 성공시
        res.status(200).json(result); // 200: OK
        logger.info(`게시글 생성 성공: ${title}`);
    } catch (err) {
        // 삽입중 오류 발생시
        res.status(500).send('게시글 생성 중 오류 발생: ' + err.message); // 500: Internal Server Error
        logger.error(`게시글 생성 실패: ${err.message}`);
    }
};

export const postViewController = async (req, res) => {
    const { categoryId, limit } = req.query; // Request Params에서 userId, categoryId, limit 추출
    try {
        // 게시글 조회
        const posts = categoryId 
            ? await Post.getPostByCategoryId(categoryId, limit) 
            : await Post.getAllPosts(limit);
        
        // 조회 성공시
        logger.info('게시글 조회 성공');
        res.status(200).json(posts);
    } catch (err) {
        // 조회중 오류 발생시
        logger.error(`게시글 조회 실패: ${err.message}`);
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
    }
};

export const getPostDetailController = async (req, res) => {
    const postId = req.params.id; // Request Parameter에서 postId 추출

    try {
        const post = await Post.getPostByPostId(postId);
        // 조회 성공시
        if (post) {
            logger.info(`게시글 조회 성공: ${postId}`);
            res.status(200).json(post);
        } else {
            logger.error(`게시글 조회 실패: 해당하는 게시글이 없습니다.`);
            res.status(404).send('해당하는 게시글을 찾을 수 없습니다.');
        }
    } catch (err) {
        // 조회중 오류 발생시
        logger.error(`게시글 조회 실패: ${err.message}`);
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
    }
};
