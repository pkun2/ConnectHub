import express from 'express';
import { changeNicknameController } from '../controller/nicknameChangeController.js';

const nicknameChangeRouter = express.Router();

nicknameChangeRouter.post('/changeNickname', changeNicknameController);

export default nicknameChangeRouter;
