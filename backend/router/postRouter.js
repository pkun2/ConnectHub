import express from "express";
import { correctGrammar, postWriteController, postViewController, getPostDetailController, deletePostController, postCommentController, getCommentsByPostController, postUpdateController, reportPostController, reportCommentController} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").post(postWriteController);
postRouter.get("/", postViewController)
postRouter.delete("/", deletePostController);
postRouter.get("/:id", getPostDetailController);
postRouter.put("/update/:id", postUpdateController);  // 게시글 변경 기능
postRouter.get("/:id/comment", getCommentsByPostController);
postRouter.post("/comment", postCommentController);
postRouter.post('/report', reportPostController);
postRouter.post("/:id/comment/report", reportCommentController); // 댓글 신고 기능
postRouter.post("/grammer", correctGrammar);

export default postRouter;
