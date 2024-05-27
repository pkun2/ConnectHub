import express from "express";
import { postWriteController, postViewController, getPostDetailController, deletePostController, postCommentController, getCommentsByPostController} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").post(postWriteController);
postRouter.get("/", postViewController)
postRouter.delete("/", deletePostController);
postRouter.get("/:id", getPostDetailController);
postRouter.get("/:id/comment", getCommentsByPostController);
postRouter.post("/comment", postCommentController);

export default postRouter;
