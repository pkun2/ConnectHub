// loginRouter.js
import express from "express";
import { getLoginController, logoutController, postLoginController } from "../controller/loginController";

// Express 라우터 생성
const loginRouter = express.Router(); 

// 라우터 설정
loginRouter.route("/").get(getLoginController).post(postLoginController);
loginRouter.get("/logout", logoutController); // 로그아웃 라우터 설정

export default loginRouter;
