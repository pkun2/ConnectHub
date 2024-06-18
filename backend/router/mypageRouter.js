import express from 'express';
import { mypageController } from '../controller/mypageController.js';

const mypageRouter = express.Router();

mypageRouter.post('/changeNickname', mypageController.changeNickname);
mypageRouter.post('/changePassword', mypageController.changePassword);

export default mypageRouter;
