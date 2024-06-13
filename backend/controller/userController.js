import User from "../model/User.js";
import db from '../config/db.js';
import twilio from 'twilio';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 회원가입 페이지
export const getSignUpController = (req, res) => {
    res.send("회원가입 페이지입니다.");
};

// 회원가입 처리 
export const postSignUpController = async (req, res) => {
    const { email, nickname, phoneNum, password, verificationCode } = req.body;

    try {
        console.log(phoneNum);

        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: phoneNum, code: verificationCode });

        if (verificationCheck.status !== 'approved') {
            return res.status(401).send("유효하지 않은 인증 코드입니다.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, nickname, phoneNum, password: hashedPassword });
        await newUser.save();
        res.status(200).send("회원가입 성공");
    } catch (error) {
        console.error('회원가입 실패:', error);
        res.status(500).send("회원가입 도중 오류가 발생했습니다.");
    }
};

// 로그인 페이지 
export const getLoginController = (req, res) => {
    res.send("로그인 페이지입니다.");
};

// 로그인 처리 
export const postLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(sql, [email]);

        if (result.length === 0) {
            res.status(401).send("로그인 실패: 이메일이 존재하지 않습니다.");
            return;
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send("로그인 실패: 비밀번호가 일치하지 않습니다.");
            return;
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        
        req.session.userId = { email, token};
        
        res.status(200).json({message: "로그인 성공", token: token});
    } catch (error) {
        console.error('로그인 도중 오류가 발생했습니다:', error);
        res.status(500).send("로그인 도중 오류가 발생했습니다.");
    }
};

// 이메일 찾기
export const findEmailByPhoneNum = async (req, res) => {
    const { phoneNum } = req.body;

    try {
        const sql = 'SELECT email FROM users WHERE phoneNum = ?';
        const [rows] = await db.query(sql, [phoneNum]);
        
        if (rows.length === 0) {
            return res.status(404).send('일치하는 사용자가 없습니다.');
        }

        const emails = rows.map(row => row.email);
        const formattedEmails = emails.join(', ');
        res.status(200).send(formattedEmails);
    } catch (error) {
        console.error('이메일 찾기 실패:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};

// 프로필: 닉네임 변경
export const changeNicknameController = async (req, res) => {
    const { email, currentPassword, newNickname } = req.body;

    if (!email || !currentPassword || !newNickname) {
        return res.status(400).send('필수 필드가 누락되었습니다.');
    }

    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(sql, [email]);

        if (result.length === 0) {
            return res.status(404).send('해당 이메일을 찾을 수 없습니다.');
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).send('현재 비밀번호가 일치하지 않습니다.');
        }

        const updateSql = 'UPDATE users SET nickname = ? WHERE email = ?';
        await db.query(updateSql, [newNickname, email]);

        res.status(200).send('닉네임이 성공적으로 변경되었습니다.');
    } catch (error) {
        console.error('닉네임 변경 중 오류 발생:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};

// 프로필: 비밀번호 변경
export const changePasswordController = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return res.status(400).send('필수 필드가 누락되었습니다.');
    }

    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(sql, [email]);

        if (result.length === 0) {
            return res.status(404).send('해당 이메일을 찾을 수 없습니다.');
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).send('현재 비밀번호가 일치하지 않습니다.');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = 'UPDATE users SET password = ? WHERE email = ?';
        await db.query(updateSql, [hashedNewPassword, email]);

        res.status(200).send('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
        console.error('비밀번호 변경 중 오류 발생:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};

// 비밀번호 재설정 요청
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
        await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verifications
            .create({ to: phoneNum, channel: 'sms' });

        res.status(200).send('인증번호가 전송되었습니다.');
    } catch (error) {
        console.error('인증번호 전송 중 오류 발생:', error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};

// 비밀번호 재설정
export const resetPasswordController = async (req, res) => {
    const { email, phoneNum, verificationCode, newPassword } = req.body;

    try {
        // 인증번호 확인
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
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

// 로그아웃
export const logoutController = (req, res) => {
    req.session.destroy();
    if (err) {
        return res.status(500).json({ message: '로그아웃 실패' });
    }
    res.status(200).json({ message: '성공적으로 로그아웃 되었습니디.' });
};

// 인증 코드 전송 
export const sendVerificationCode = async (req, res) => {
    const { phoneNum } = req.body; // Request Body에서 전화번호(phone) 추출

    // 전화번호가 없는 경우
    if (!phoneNum) { 
        return res.status(400).json({ error: '전화번호를 입력해야 합니다.' });
    }

    // Twilio를 사용하여 인증 코드 전송
    try { 
        // SMS 채널을 통해 인증 코드 전송 요청
        const verification = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verifications
            .create({ to: phoneNum, channel: 'sms' });

        console.log(verification.sid);

        res.status(200).json({ message: '인증 코드가 성공적으로 전송되었습니다.' });
    } catch (error) {
        console.error('인증 코드 전송 오류:', error);
        res.status(500).json({ error: '인증 코드를 전송하는 데 실패했습니다.' });
    }
};
