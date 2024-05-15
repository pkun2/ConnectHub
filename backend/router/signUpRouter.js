// signUpRouter.js
import express from "express";
import { getSignUpController, postSignUpController } from "../controller/signUpController";

// Express 라우터 생성
const signUpRouter = express.Router();

// 라우터 설정
signUpRouter.route("/").get(getSignUpController).post(postSignUpController);

export default signUpRouter;
