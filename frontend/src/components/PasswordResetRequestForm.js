import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignUpContainer, SignUpBox, Title, Input, Button } from './SignUpStyle'; // Import SignUpStyle for styling
import { speak } from '../speech/speechUtils';     // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import

function PasswordResetRequestForm() {
    const [formData, setFormData] = useState({
        email: '',
        phoneNum: ''
    });
    const [alertMessage, setAlertMessage] = useState(''); // tts
    const navigate = useNavigate();

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
            alert(successMessage);
            navigate('/reset'); 
        } catch (error) {
            console.error('비밀번호 재설정 요청 실패:', error);
            const errorMessage = '비밀번호 재설정 요청 중 오류가 발생했습니다.';
            setAlertMessage(errorMessage); // tts, 실패 메시지 
            alert(errorMessage);
        }
    };

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

    return (
        <SignUpContainer> {/* Use SignUpContainer */}
            <Title>비밀번호 재설정 요청</Title> {/* Use Title */}
            <SignUpBox> {/* Use SignUpBox */}
                <form onSubmit={handleSubmit}>
                    <Input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} tabIndex="0" />
                    <Input type="tel" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} tabIndex="0" />
                    <Button type="submit" tabIndex="0">인증번호 요청</Button> {/* Use Button */}
                </form>
            </SignUpBox>
            {alertMessage && <AlertMessage message={alertMessage} />} {/* Render alert message for speech */}
        </SignUpContainer>
    );
}

export default PasswordResetRequestForm;
