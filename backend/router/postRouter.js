import express from "express";
import { getWriteController, postWriteController, postViewController } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").get(getWriteController).post(postWriteController);
postRouter.get("/", postViewController)

export default postRouter;
