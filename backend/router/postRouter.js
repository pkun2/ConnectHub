import express from "express";
import { getWriteController, postWriteController } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").get(getWriteController).post(postWriteController);

export default postRouter;
