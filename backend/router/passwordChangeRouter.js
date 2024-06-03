import express from 'express';
import { changePasswordController } from '../controller/passwordChangeController.js';

const passwordChangeRouter = express.Router();

passwordChangeRouter.post('/changePassword', changePasswordController);

export default passwordChangeRouter;
