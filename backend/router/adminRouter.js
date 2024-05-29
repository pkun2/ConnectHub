import express from "express";

import { getTodayVisitController, getTotalVisitController, postPostController, deletePostController, deleteCommentController } from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.delete("/delete/comment/:id", deleteCommentController);
adminRouter.delete("/delete/post/:id", deletePostController);
adminRouter.post("/post", postPostController);
adminRouter.get("/visit/today", getTodayVisitController);
adminRouter.get("/visit/total", getTotalVisitController);

export default adminRouter;