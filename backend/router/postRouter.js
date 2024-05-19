import express from "express";
import { getWriteController, postWriteController, postViewController, getPostDetailController, postReportController } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").get(getWriteController).post(postWriteController);
postRouter.get("/", postViewController)
postRouter.get("/:id", getPostDetailController);
postRouter.post("/report/:id", postReportController); // 신고 기능 추가

export default postRouter;
