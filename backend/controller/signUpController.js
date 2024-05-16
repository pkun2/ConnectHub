import User from "../model/User";
import bcrypt from 'bcrypt';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const getSignUpController = (req, res) => {
    res.send("회원가입 페이지입니다.");
};

export const postSignUpController = async (req, res) => {
    const { userId, nickname, phone, password, verificationCode } = req.body;

    try {
        // 인증 코드의 유효성을 확인
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: phone, code: verificationCode });

        // 인증 코드가 승인되지 않았을 경우 오류 응답을 반환
        if (verificationCheck.status !== 'approved') {
            return res.status(401).send("유효하지 않은 인증 코드입니다.");
        }

        // 인증이 성공하면 사용자 등록을 진행
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // 비밀번호 해싱
        const newUser = new User({ userId, nickname, phone, password:hashedPassword });
        await newUser.save();
        res.status(200).send("회원가입 성공");
    } catch (error) {
        console.error('회원가입 실패:', error);
        res.status(500).send("회원가입 도중 오류가 발생했습니다.");
    }
};
