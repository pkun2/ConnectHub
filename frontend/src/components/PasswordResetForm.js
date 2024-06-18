import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignUpContainer, SignUpBox, Title, Input, Button, StyledLink, Button2 } from './SignUpStyle'; // Import SignUpStyle for styling
import { speak } from '../speech/speechUtils';     // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // stt 사용을 위한 import

function PasswordResetForm() {
    const [formData, setFormData] = useState({
        email: '',
        verificationCode: '',
        newPassword: '',
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
            await axios.post('http://localhost:4000/api/user/resetPassword', formData);
            const successMessage = '비밀번호가 성공적으로 재설정되었습니다.';
            setAlertMessage(successMessage); // tts, 성공 메시지

            // 음성 출력이 끝난 후 화면 전환
            speak(successMessage, { lang: 'ko-KR' }).then(() => {
                navigate('/login');
            });
        } catch (error) {
            console.error('비밀번호 재설정 실패:', error);
            const errorMessage = '비밀번호 재설정 중 오류가 발생했습니다.';
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
            let updatedTranscript = transcript.trim().replace(' 골뱅이 ', '@').replace('-', '').replace('더하기 ', '+'); // 공백 제거 및 특수문자 변환

            if (isListeningForField) {
                switch (isListeningForField) {
                    case 'email':
                        setFormData(prevData => ({ ...prevData, email: updatedTranscript }));
                        speak('이메일이 입력되었습니다.', { lang: 'ko-KR' });
                        break;
                    case 'phoneNum':
                        setFormData(prevData => ({ ...prevData, phoneNum: updatedTranscript }));
                        speak('전화번호가 입력되었습니다.', { lang: 'ko-KR' });
                        break;
                    case 'verificationCode':
                        setFormData(prevData => ({ ...prevData, verificationCode: updatedTranscript }));
                        speak('인증번호가 입력되었습니다.', { lang: 'ko-KR' });
                        break;
                    case 'newPassword':
                        setFormData(prevData => ({ ...prevData, newPassword: updatedTranscript }));
                        speak('새 비밀번호가 입력되었습니다.', { lang: 'ko-KR' });
                        break;
                    default:
                        break;
                }
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

    return (
        <SignUpContainer>
            <Title>비밀번호 재설정</Title>
            <SignUpBox>
                <form onSubmit={handleSubmit}>
                    <Input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} tabIndex="0" />
                    <Button2 type="button" onClick={() => startListening('email')} tabIndex="0">음성으로 이메일 입력</Button2>
                    <Input type="tel" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} tabIndex="0" />
                    <Button2 type="button" onClick={() => startListening('phoneNum')} tabIndex="0">음성으로 전화번호 입력</Button2>
                    <Input type="text" name="verificationCode" placeholder="인증번호" value={formData.verificationCode} onChange={handleChange} tabIndex="0" />
                    <Button2 type="button" onClick={() => startListening('verificationCode')} tabIndex="0">음성으로 인증번호 입력</Button2>
                    <Input type="password" name="newPassword" placeholder="새 비밀번호" value={formData.newPassword} onChange={handleChange} tabIndex="0" />
                    <Button2 type="button" onClick={() => startListening('newPassword')} tabIndex="0">음성으로 새 비밀번호 입력</Button2>
                    <Button type="submit" tabIndex="0">비밀번호 재설정</Button>
                </form>
            </SignUpBox>
            {alertMessage && <AlertMessage message={alertMessage} />}
        </SignUpContainer>
    );
}

export default PasswordResetForm;
