import express from "express";
import { getWriteController, postWriteController, postViewController, deletePostController, getPostDetailController } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").get(getWriteController).post(postWriteController);
postRouter.get("/", postViewController)
postRouter.delete("/", deletePostController);
postRouter.get("/:id", getPostDetailController);

export default postRouter;
