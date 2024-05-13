// signUpRouter.js
import express from "express";
import { getSignUpController, postSignUpController } from "../controller/signUpController";

const signUpRouter = express.Router();

signUpRouter.route("/signup").get(getSignUpController).post(postSignUpController);

export default signUpRouter;
