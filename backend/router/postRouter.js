import express from "express";
import { postWriteController, postViewController, getPostDetailController, postCommentController, getCommentsByPostController} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").post(postWriteController);
postRouter.get("/", postViewController)
postRouter.get("/:id", getPostDetailController);
postRouter.get("/:id/comment", getCommentsByPostController);
postRouter.post("/comment", postCommentController);

export default postRouter;
