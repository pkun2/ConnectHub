import express from "express";
import { postWriteController, postViewController, getPostDetailController, deletePostController, postCommentController, getCommentsByPostController, postReportController, postUpdateController} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").post(postWriteController);
postRouter.get("/", postViewController)
postRouter.delete("/", deletePostController);
postRouter.get("/:id", getPostDetailController);
postRouter.post("/report/:id", postReportController); // 게시글 신고 기능
postRouter.put("/update/:id", postUpdateController);  // 게시글 변경 기능
postRouter.get("/:id/comment", getCommentsByPostController);
postRouter.post("/comment", postCommentController);


export default postRouter;
