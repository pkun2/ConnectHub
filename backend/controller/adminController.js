// 해야할일
/*
    11.5 게시글 관리 기능 구현
    11.6 댓글 관리 기능 구현
    11.7 통계 기능 구현
*/
import Post from "../model/Post"
import Comment from "../model/Comment";
import Admin from "../model/Admin";

export const getAllPostsController = async (req, res) => {
    try {
        const posts = await Post.getAllPosts(20);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send('게시글 조회 중 오류 발생: ' + err.message);
    }
};

export const getAllCommentsController = async (req, res) => {
    try {
        const comments = await Admin.getAllComments();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).send('댓글 조회 중 오류 발생: ' + err.message);
    }
};

export const getAllReportsController = async (req, res) => {
    try {
        const reports = await Admin.getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).send('신고 조회 중 오류 발생: ' + err.message);
    }
};

export const postPostController = async (req, res) => {
    const { userId, categoryId, title, content } = req.body;
    try {
        const result = await Post.insertPost(userId, categoryId, title, content);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('게시글 생성 중 오류 발생: ' + err.message);
    }
};

export const deletePostController = async (req, res) => {
    const postId = req.params.id;
    try {
        const result = await Post.deletePost(postId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('게시글 삭제 중 오류 발생: ' + err.message);
    }
};

export const deleteCommentController = async (req, res) => {
    const commentId = req.params.id;

    try {
        const result = await Comment.deleteComment(commentId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('댓글 삭제 중 오류 발생: ' + err.message);
    }
};

export const getTotalVisitController = async (req, res) => {
    try {
        const result = await Admin.getTotalVisiter();
        const totalVisitors = result[0]['SUM(count)'];
        res.status(200).json({ count: totalVisitors });
    } catch (err) {
        res.status(500).send('방문자 수 조회 중 오류 발생: ' + err.message);
    }
};


export const getTodayVisitController = async (req, res) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜
    try {
        const result = await Admin.getCountVisiter(today);
        console.log("today", result);
        if (result.length > 0) {
            res.status(200).json(result[0]); // 첫 번째 요소를 반환
        } else {
            res.status(200).json({ count: 0 }); // 결과가 없는 경우 기본값 반환
        }
    }
    catch (err) {
        res.status(500).send('방문자 수 조회 중 오류 발생: ' + err.message);
    }
};
