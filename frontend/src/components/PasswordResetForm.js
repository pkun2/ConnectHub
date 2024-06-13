import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignUpContainer, SignUpBox, Title, Input, Button } from './SignUpStyle'; // 스타일 파일에서 스타일 import
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import

function PasswordResetForm() {
    const [formData, setFormData] = useState({
        email: '',
        verificationCode: '',
        newPassword: '',
        phoneNum: ''
    });
    const [alertMessage, setAlertMessage] = useState(''); // 음성으로 알려줄 경고 메시지 상태 추가
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
            await axios.post('http://localhost:4000/api/user/resetPassword', formData);
            const successMessage = '비밀번호가 성공적으로 재설정되었습니다.';
            setAlertMessage(successMessage); // 음성으로 성공 메시지 출력

            // 음성 출력이 끝난 후 화면 전환
            speak(successMessage, { lang: 'ko-KR' }).then(() => {
                navigate('/login');
            });
        } catch (error) {
            console.error('비밀번호 재설정 실패:', error);
            const errorMessage = '비밀번호 재설정 중 오류가 발생했습니다.';
            setAlertMessage(errorMessage); // 음성으로 실패 메시지 출력
            
            // 음성 출력
            speak(errorMessage, { lang: 'ko-KR' });
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
        <SignUpContainer> {/* SignUpContainer로 변경 */}
            <Title>비밀번호 재설정</Title> {/* Title로 변경 */}
            <SignUpBox> {/* SignUpBox로 변경 */}
                <form onSubmit={handleSubmit}>
                    <Input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} tabIndex="0"/>
                    <Input type="tel" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} tabIndex="0"/>
                    <Input type="text" name="verificationCode" placeholder="인증번호" value={formData.verificationCode} onChange={handleChange} tabIndex="0"/>
                    <Input type="password" name="newPassword" placeholder="새 비밀번호" value={formData.newPassword} onChange={handleChange} tabIndex="0"/>
                    <Button type="submit" tabIndex="0">비밀번호 재설정 </Button> {/* Button으로 변경 */}
                </form>
            </SignUpBox>
            {alertMessage && <AlertMessage message={alertMessage} />} {/* 음성으로 알려줄 경고 메시지 출력 */}
        </SignUpContainer>
    );
}

export default PasswordResetForm;
