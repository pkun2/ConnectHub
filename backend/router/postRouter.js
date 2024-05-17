import express from "express";
import { getWriteController, postWriteController, postViewController, deletePostController } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").get(getWriteController).post(postWriteController);
postRouter.get("/", postViewController)
postRouter.delete("/", deletePostController);

export default postRouter;
