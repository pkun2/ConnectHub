import express from "express";
import { getWriteController, postWriteController, postViewController, getPostDetailController, postReportController, postUpdateController } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/write").get(getWriteController).post(postWriteController);
postRouter.get("/", postViewController)
postRouter.get("/:id", getPostDetailController);
postRouter.post("/report/:id", postReportController); // 게시글 신고 기능
postRouter.put("/update/:id", postUpdateController);  // 게시글 변경 기능


export default postRouter;
