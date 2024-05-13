// loginRouter.js
import express from "express";
import { getLoginController, postLoginController } from "../controller/loginController";

const loginRouter = express.Router();

loginRouter.route("/").get(getLoginController).post(postLoginController);

export default loginRouter;
