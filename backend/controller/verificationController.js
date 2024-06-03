import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config(); // 환경 변수 설정, wilio 클라이언트 생성
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 인증 코드를 전송하는 컨트롤러
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


