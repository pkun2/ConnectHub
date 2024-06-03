import express from "express";
import { findEmailByPhoneNum } from "../controller/emailFindController"

const emailFindRouter = express.Router();

emailFindRouter.post("/", findEmailByPhoneNum);

export default emailFindRouter;
