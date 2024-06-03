import express from "express";
import { requestPasswordResetController, resetPasswordController } from "../controller/passwordResetController";

const passwordResetRouter = express.Router();

passwordResetRouter.post("/requestReset", requestPasswordResetController);
passwordResetRouter.post("/reset", resetPasswordController);

export default passwordResetRouter;
