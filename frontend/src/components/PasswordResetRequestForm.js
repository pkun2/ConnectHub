import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignUpContainer, SignUpBox, Title, Input, Button, StyledLink, Button2 } from './SignUpStyle'; // Import SignUpStyle for styling
import { speak } from '../speech/speechUtils';     // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // stt 사용을 위한 import

function PasswordResetRequestForm() {
    const [formData, setFormData] = useState({
        email: '',
        phoneNum: ''
    });
    const [alertMessage, setAlertMessage] = useState(''); // tts
    const [isListeningForField, setIsListeningForField] = useState('');

    const navigate = useNavigate();
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4000/api/user/request-resetPassword', formData);
            const successMessage = '비밀번호 재설정 인증번호가 SMS로 전송되었습니다.';
            setAlertMessage(successMessage); // tts, 성공 메시지

            // 음성 출력이 끝난 후 화면 전환
            speak(successMessage, { lang: 'ko-KR' }).then(() => {
                navigate('/reset');
            });
        } catch (error) {
            console.error('비밀번호 재설정 요청 실패:', error);
            const errorMessage = '비밀번호 재설정 요청 중 오류가 발생했습니다.';
            setAlertMessage(errorMessage); // tts, 실패 메시지 

            // 음성 출력
            speak(errorMessage, { lang: 'ko-KR' });
        }
    };

    // 음성 인식 시작
    const startListening = (field) => {
        setIsListeningForField(field);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false });
    };

    // 음성 인식 결과 처리
    useEffect(() => {
        if (!listening && transcript) {
            let updatedTranscript = transcript.replace(' 골뱅이 ', '@').replace('-', '').replace('더하기 ', '+'); // 공백 제거 및 특수문자 변환

            if (isListeningForField) {
                setFormData(prevData => ({ ...prevData, [isListeningForField]: updatedTranscript }));
                speak(`${isListeningForField}이 입력되었습니다.`, { lang: 'ko-KR' });
                setIsListeningForField('');
            }
        }
    }, [listening, transcript, isListeningForField]);

    // tts, 음성 출력 및 탭으로 포커싱 및 엔터 키로 작동 설정
    useEffect(() => {
        const tabs = document.querySelectorAll('[tabindex]');
        const handleFocus = (event) => {
            const text = event.target.placeholder || event.target.textContent || '';
            speak(text, { lang: 'ko-KR' });
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.target.click();
            }
        };
        tabs.forEach(tab => {
            tab.addEventListener('focus', handleFocus);
            tab.addEventListener('keydown', handleKeyDown);
        });
        return () => {
            tabs.forEach(tab => {
                tab.removeEventListener('focus', handleFocus);
                tab.removeEventListener('keydown', handleKeyDown);
            });
        };
    }, []);

    if (!browserSupportsSpeechRecognition) {
        console.error("브라우저가 음성 인식을 지원하지 않습니다.");
        return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <SignUpContainer>
            <Title>비밀번호 재설정 요청</Title>
            <SignUpBox>
                <form onSubmit={handleSubmit}>
                    <Input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} tabIndex="0" />
                    <Button2 type="button" onClick={() => startListening('email')} tabIndex="0">음성으로 이메일 입력</Button2>
                    <Input type="tel" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} tabIndex="0" />
                    <Button2 type="button" onClick={() => startListening('phoneNum')} tabIndex="0">음성으로 전화번호 입력</Button2>
                    <Button type="submit" tabIndex="0">인증번호 요청</Button>
                </form>
                <StyledLink onClick={handleGoBack} tabIndex="0">뒤로가기</StyledLink>
            </SignUpBox>
            {alertMessage && <AlertMessage message={alertMessage} />}
        </SignUpContainer>
    );
}

export default PasswordResetRequestForm;
