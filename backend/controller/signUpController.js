import User from "../model/User.js";
import twilio from 'twilio';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const getSignUpController = (req, res) => {
    res.send("회원가입 페이지입니다.");
};

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