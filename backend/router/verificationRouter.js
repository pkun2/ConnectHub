// verificationRoutes.js
import express from 'express';
import { sendVerificationCode } from '../controller/verificationController.js';

// Express 라우터 생성
const router = express.Router();

// 라우터 설정
router.route("/sendVerificationCode").post(sendVerificationCode);

export default router;
