import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail } from '../services/emailService'; // 이메일 서비스
import User from '../model/User';

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, nickname, email, password } = req.body;

    if (!userId || !nickname || !email || !password) {
        return res.status(400).json({ message: '모든 필드를 채워주세요.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userId, nickname, email, password: hashedPassword });

        const emailToken = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await sendVerificationEmail(email, emailToken);

        res.status(201).json({ message: '회원가입 성공! 이메일을 확인하세요.' });
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
    }
});

export default router;
