// loginRouter.js
import express from "express";
import { getLoginController, postLoginController } from "../controller/loginController";

// Express 라우터 생성
const loginRouter = express.Router(); 

// 라우터 설정
loginRouter.route("/").get(getLoginController).post(postLoginController);

export default loginRouter;
