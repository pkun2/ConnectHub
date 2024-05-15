// verificationRoutes.js
import express from 'express';
import { sendVerificationCode, verifyVerificationCode } from '../controller/verificationController.js';

// Express 라우터 생성
const router = express.Router();

// 라우터 설정
router.route("/sendVerificationCode").post(sendVerificationCode);
router.route("/verifyVerificationCode").post(verifyVerificationCode);

export default router;
