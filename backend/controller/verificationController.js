import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config(); // 환경 변수 설정, wilio 클라이언트 생성
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 인증 코드를 전송하는 컨트롤러
export const sendVerificationCode = async (req, res) => {
    const { phone } = req.body; // Request Body에서 전화번호(phone) 추출

    // 전화번호가 없는 경우
    if (!phone) { 
        return res.status(400).json({ error: '전화번호를 입력해야 합니다.' });
    }

    // Twilio를 사용하여 인증 코드 전송
    try { 
        // SMS 채널을 통해 인증 코드 전송 요청
        const verification = await client.verify.services(process.env.TWILIO_SERVICE_ID)
            .verifications
            .create({ to: phone, channel: 'sms' });

        console.log(verification.sid);

        res.status(200).json({ message: '인증 코드가 성공적으로 전송되었습니다.' });
    } catch (error) {
        console.error('인증 코드 전송 오류:', error);
        res.status(500).json({ error: '인증 코드를 전송하는 데 실패했습니다.' });
    }
};

// 인증 코드를 확인하는 컨트롤러
export const verifyVerificationCode = async (req, res) => {
    const { phone, code } = req.body; // Request Body에서 전화번호와 인증 코드 추출

    // 전화번호 또는 인증 코드가 없는 경우
    if (!phone || !code) { 
        return res.status(400).json({ error: '전화번호와 인증 코드가 필요합니다.' });
    }

    // Twilio를 사용하여 인증 코드 확인
    try { 
        const verificationCheck = await client.verify.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: phone, code }); // 전화번호와 인증 코드를 사용하여 확인 요청

        console.log(verificationCheck.status);

        // 인증이 성공한 경우
        if (verificationCheck.status === 'approved') {
            res.status(200).json({ message: '인증 코드가 유효합니다.' });
        } else {
            res.status(401).json({ error: '유효하지 않은 인증 코드입니다.' });
        }
    } catch (error) {
        console.error('인증 코드 확인 오류:', error);
        res.status(500).json({ error: '인증 코드를 확인하는 데 실패했습니다.' });
    }
};
