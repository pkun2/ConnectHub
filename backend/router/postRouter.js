import express from "express";
import { getWriteController, postWriteController, postViewController, getPostDetailController } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").get(getWriteController).post(postWriteController);
postRouter.get("/", postViewController)
postRouter.get("/:id", getPostDetailController);

export default postRouter;
