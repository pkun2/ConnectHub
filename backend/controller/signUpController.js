import User from "../model/User"; // User 모델 가져오기
import twilio from 'twilio';      // 전화번호 인증을 위한 모듈 
import dotenv from 'dotenv';

dotenv.config(); // 환경 변수 설정, Twilio 정보
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 회원가입 페이지에 대한 GET 요청에 대한 핸들러
export const getSignUpController = (req, res) => {
    res.send("회원가입 페이지입니다.");
}

// 회원가입에 대한 POST 요청에 대한 핸들러
export const postSignUpController = async (req, res) => {
    const { userId, nickname, phone, password, verificationCode } = req.body;

    try {
        // 인증 코드가 유효한지 확인
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: phone, code: verificationCode });

        // 인증 코드가 유효하지 않은 경우
        if (verificationCheck.status !== 'approved') {
            return res.status(401).send("유효하지 않은 인증 코드입니다.");
        }

        // 인증 성공시, 사용자 등록 진행
        const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱
        const newUser = new User({ userId, nickname, phone, password: hashedPassword });
        await newUser.save(); // 사용자 등록
        res.status(200).send("회원가입 성공");
    } catch (error) {
        console.error('회원가입 실패:', error);
        res.status(500).send("회원가입 도중 오류가 발생했습니다.");
    }
};
