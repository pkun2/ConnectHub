import express from "express";
import {
    getSignUpController, postSignUpController,
    getLoginController, postLoginController,
    findEmailByPhoneNum, sendVerificationCode,
    changeNicknameController, changePasswordController,
    requestPasswordResetController, resetPasswordController,
    logoutController
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/signup").get(getSignUpController).post(postSignUpController);
userRouter.route("/login").get(getLoginController).post(postLoginController);
userRouter.route("/findemail").post(findEmailByPhoneNum);
userRouter.post("/logout", logoutController)
userRouter.route("/changeNickname").post(changeNicknameController);
userRouter.route("/changePassword").post(changePasswordController);
userRouter.route("/request-resetPassword").post(requestPasswordResetController);
userRouter.route("/resetPassword").post(resetPasswordController);
userRouter.route("/sendVerificationCode").post(sendVerificationCode);

export default userRouter;
