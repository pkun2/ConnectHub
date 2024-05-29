import express from 'express';
import { changeNicknameController } from '../controller/nicknameChangeController.js';

const nicknameChangeRouter = express.Router();

nicknameChangeRouter.post('/', changeNicknameController);

export default nicknameChangeRouter;
