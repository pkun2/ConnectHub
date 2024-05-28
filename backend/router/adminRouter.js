import express from "express";

import { getTodayVisitController, getTotalVisitController, postPostController, deletePostController, deleteCommentController } from "../controller/adminController";

const adminRouter = express.Router();

adminRouter.delete("/delete/post/:id", deletePostController);

export default adminRouter;