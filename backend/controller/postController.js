// controller/postController.js
import Post from '../model/Post';
import Comment from '../model/Comment';

export const getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.getPostDetail(postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
    }
};

export const getCommentsByPostId = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await Comment.getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).send('댓글 조회 중 오류 발생: ' + err.message);
    }
};
