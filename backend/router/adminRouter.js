import express from "express";

import { getTodayVisitController, getTotalVisitController, postPostController, deletePostController, deleteCommentController, getAllPostsController, getAllCommentsController, getAllReportsController } from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.delete("/delete/comment/:id", deleteCommentController);
adminRouter.delete("/delete/post/:id", deletePostController);
adminRouter.post("/post", postPostController);
adminRouter.get("/visit/today", getTodayVisitController);
adminRouter.get("/visit/total", getTotalVisitController);
adminRouter.get("/posts",getAllPostsController);
adminRouter.get("/comments",getAllCommentsController);
adminRouter.get("/reports",getAllReportsController);

export default adminRouter;