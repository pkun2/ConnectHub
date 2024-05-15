import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User';

const router = express.Router();

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: '잘못된 인증 링크입니다.' });
        }

        user.emailVerified = true;
        await user.save();

        res.status(200).json({ message: '이메일 인증이 완료되었습니다.' });
    } catch (error) {
        console.error('이메일 인증 중 오류 발생:', error);
        res.status(500).json({ message: '이메일 인증 중 오류가 발생했습니다.' });
    }
});

export default router;
