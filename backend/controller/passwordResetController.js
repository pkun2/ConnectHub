import bcrypt from 'bcrypt';
import twilio from 'twilio';
import dotenv from 'dotenv';
import db from '../config/db.js';

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const requestPasswordResetController = async (req, res) => {
    const { email, phoneNum } = req.body;

    try {
        const sql = 'SELECT * FROM users WHERE email = ? AND phoneNum = ?';
        const [rows] = await db.query(sql, [email, phoneNum]);
        const user = rows[0];

        if (!user) {
            return res.status(404).send('해당 이메일과 전화번호가 일치하는 사용자를 찾을 수 없습니다.');
        }

        // 인증번호 생성 및 전송
        await twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verifications
            .create({ to: phoneNum, channel: 'sms' });

        res.status(200).send('인증번호가 전송되었습니다.');
    } catch (error) {
        console.error('인증번호 전송 중 오류 발생:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};

export const resetPasswordController = async (req, res) => {
    const { email, phoneNum, verificationCode, newPassword } = req.body;

    try {
        // 인증번호 확인
        const verificationCheck = await twilioClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: phoneNum, code: verificationCode });

        if (verificationCheck.status !== 'approved') {
            return res.status(401).send('유효하지 않은 인증 코드입니다.');
        }

        // 비밀번호 해싱 및 업데이트
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ? WHERE email = ?';
        await db.query(updateSql, [hashedNewPassword, email]);

        res.status(200).send('비밀번호가 성공적으로 재설정되었습니다.');
    } catch (error) {
        console.error('비밀번호 재설정 중 오류 발생:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};
