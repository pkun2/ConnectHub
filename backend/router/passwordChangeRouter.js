import express from 'express';
import { changePasswordController } from '../controller/passwordChangeController.js';

const passwordChangeRouter = express.Router();

passwordChangeRouter.post('/', changePasswordController);

export default passwordChangeRouter;
