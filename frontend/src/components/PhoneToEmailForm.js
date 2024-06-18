import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SignUpContainer, SignUpBox, Title, Input, Button, StyledLink, Button2 } from './SignUpStyle'; // Import SignUpStyle for styling
import { useNavigate } from 'react-router-dom';
import { speak } from '../speech/speechUtils';     // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // stt 사용을 위한 import

function PhoneToEmailForm() {
    const [phoneNum, setPhoneNum] = useState('');
    const [foundEmail, setFoundEmail] = useState('');
    const [alertMessage, setAlertMessage] = useState(''); // tts 
    const [isListeningForField, setIsListeningForField] = useState('');

    const navigate = useNavigate();
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const handleChange = (event) => {
        setPhoneNum(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/user/findEmail', { phoneNum });
            setFoundEmail(response.data);
            const successMessage = `찾은 이메일: ${response.data}`;
            setAlertMessage(successMessage); // 알림 음성 출력
            speak(successMessage, { lang: 'ko-KR' });
        } catch (error) {
            console.error('이메일 찾기 실패:', error);
            const errorMessage = '이메일 찾기 중 오류가 발생했습니다.';
            setAlertMessage(errorMessage); // 알림 음성 출력 
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
            let updatedTranscript = transcript.trim().replace('-', '').replace('더하기 ', '+'); // 공백 제거 및 특수문자 변환
            setPhoneNum(updatedTranscript);
            resetTranscript();
        }
    }, [listening, transcript, resetTranscript]);

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
            <Title>이메일 찾기</Title>
            <SignUpBox>
                <form onSubmit={handleSubmit}>
                    <Input type="tel" value={phoneNum} onChange={handleChange} placeholder="전화번호 입력" tabIndex="0" />
                    <Button2 type="button" onClick={() => startListening('phoneNum')} tabIndex="0">음성으로 전화번호 입력</Button2>
                    <Button type="submit" tabIndex="0">이메일 찾기</Button>
                </form>
                {foundEmail && <p>찾은 이메일: {foundEmail}</p>}
                <StyledLink onClick={handleGoBack} tabIndex="0">뒤로가기</StyledLink>
            </SignUpBox>
            {alertMessage && <AlertMessage message={alertMessage} />}
        </SignUpContainer>
    );
}

export default PhoneToEmailForm;
