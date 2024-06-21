import Post from "../model/Post";
import Comment from "../model/Comment";
import logger from "../config/logger";
import Report from "../model/Report";

// 게시글 작성 기능
export const postWriteController = async (req, res) => {
    const { userId, categoryId, title, content, nickname } = req.body;
    if(categoryId == 3 || categoryId == 4) {
        res.status(403).send('해당 카테고리에는 글을 작성할 수 없습니다.');
        return;
    }
    try {
        const result = await Post.insertPost(userId, categoryId, title, content, nickname);
        
        res.status(200).json(result);
        logger.info(`게시글 생성 성공: ${title}`);
    } catch (err) {
        res.status(500).send('게시글 생성 중 오류 발생: ' + err.message);
        logger.error(`게시글 생성 중 오류 발생: ${err.message}`);
    }
};

// 게시글 변경 기능 
export const postUpdateController = async (req, res) => {
    const { title, content, postId } = req.body;

    try {
        const result = await Post.updatePost(title, content, postId);
        res.status(200).json(result); // 성공적으로 업데이트되었음을 클라이언트에게 반환
    } catch (error) {
        console.error('게시글 업데이트 중 오류 발생:', error);
        res.status(500).send("게시글 업데이트 도중 오류가 발생했습니다.");
    }
};

// 게시글 전체 조회 컨트롤러
export const postViewController = async (req, res) => {
    const { categoryId, limit } = req.query;
    try {
        let posts;

        if (categoryId) {
            // 카테고리 아이디로 조회할 때 카테고리 이름 추가
            posts = await Post.getPostByCategoryId(categoryId, limit);
            for (let post of posts) {
                const categoryName = await Post.getCategoryNameByCategoryId(post.categoryId);
                post.categoryName = categoryName;
            }
        } else {
            // 전체 게시글 조회할 때 카테고리 이름 추가
            posts = await Post.getAllPosts(limit);
            for (let post of posts) {
                const categoryName = await Post.getCategoryNameByCategoryId(post.categoryId);
                post.categoryName = categoryName;
            }
        }

        res.status(200).json(posts);
        logger.info('게시글 조회 성공');
    } catch (err) {
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
        logger.error(`게시글 조회 중 오류 발생: ${err.message}`);
    }
};

// 게시글 상세 조회 컨트롤러
export const getPostDetailController = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.getPostDetail(postId);
        if (post) {
            res.status(200).json(post);
            logger.info(`게시글 상세 조회 성공: ${postId}`);
        } else {
            res.status(404).send('해당하는 게시글을 찾을 수 없습니다.');
            logger.warn(`게시글을 찾을 수 없음: ${postId}`);
        }
    } catch (err) {
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
        logger.error(`게시글 조회 중 오류 발생: ${err.message}`);
    }
};

// 댓글 작성 컨트롤러
export const postCommentController = async (req, res) => {
    const { postId, userId, content } = req.body;
    try {
        const result = await Comment.insertComment(postId, userId, content);
        res.status(200).json(result);
        logger.info(`댓글 생성 성공: ${content}`);
    } catch (err) {
        res.status(500).send('댓글 생성 중 오류 발생: ' + err.message);
        logger.error(`댓글 생성 중 오류 발생: ${err.message}`);
    }
};

// 댓글 조회 컨트롤러
export const getCommentsByPostController = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await Comment.getCommentsByPostId(postId);
        res.status(200).json(comments);
        logger.info(`댓글 조회 성공: ${postId}`);
    } catch (err) {
        res.status(500).send('댓글 조회 중 오류 발생: ' + err.message);
        logger.error(`댓글 조회 중 오류 발생: ${err.message}`);
    }
};
// 게시글 삭제 컨트롤러
export const deletePostController = async (req, res) => {
    const { userId, postId } = req.body; // Request Body에서 userId 추출
    
    try {
        const postUserId = await Post.getUserIdByPostId(postId); // 게시글 작성자 조회
        if (postUserId === null) {
            res.status(404).send('삭제할 게시글을 찾을 수 없습니다.');
            return;
        }
        if (userId != postUserId) {
            res.status(403).send('삭제 권한이 없습니다.');
            return;
        }
        const result = await Post.deletePost(postId);
        if (result.affectedRows > 0) {
            res.status(200).send('게시글이 성공적으로 삭제되었습니다.');
        } else {
            res.status(404).send('삭제할 게시글을 찾을 수 없습니다.');
        }
    } catch (err) {
        res.status(500).send('게시글 삭제 중 오류 발생: ' + err.message);
        logger.error(`게시글 삭제 중 오류 발생: ${err.message}`);
    }
};

// 게시글 신고 컨트롤러
export const reportPostController = async (req, res) => {
    const { postId, reportContent } = req.body;
    try {
        const report = await Report.insertReport('post', postId, reportContent);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: '신고 중 에러 발생', details: error.message });
    }
};

// 댓글 신고 컨트롤러
export const reportCommentController = async (req, res) => {
    const { commentId, reportContent } = req.body;
    try {
        const report = await Report.insertReport('comment', commentId, reportContent);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: '댓글 신고 중 에러 발생', details: error.message });
    }
};

export const searchPostController = async (req, res) => {
    const keyword = req.query.q;
    
    if (keyword === undefined || keyword === '') {
        return res.status(400).send('Search query가 포함되어 있지 않습니다');
    }
    try {
        const posts = await Post.searchPostsByTitle(keyword);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: '검색 중 에러 발생', details: error.message });
    }
};