import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignUpContainer, SignUpBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './SignUpStyle';
import { speak } from '../speech/speechUtils';     // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import

function SignUpForm() {
    const [formData, setFormData] = useState({
        email: '', 
        nickname: '',
        phoneNum: '',
        password: '',
        verificationCode: ''
    });

    // 음성 기능 
    const [alertMessage, setAlertMessage] = useState('');

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
            const response = await axios.post('http://localhost:4000/api/user/signup', formData);
            console.log(response.data);
            const successMessage = '회원가입에 성공하였습니다.';
            setAlertMessage(successMessage);
            
            // 음성 출력이 끝난 후 화면 전환
            speak(successMessage, { lang: 'ko-KR' }).then(() => {
                navigate('/');
            });
        } catch (error) {
            console.error('회원가입 실패:', error);
            const errorMessage = '회원가입 도중 오류가 발생했습니다. 인증 코드를 확인해 주세요.';
            setAlertMessage(errorMessage);
            
            // 음성 출력
            speak(errorMessage, { lang: 'ko-KR' });
        }
    };

    const handleSendCode = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/user/sendVerificationCode', { phoneNum: formData.phoneNum });
            console.log(response.data);
            const successMessage = '인증번호가 전송되었습니다. 핸드폰을 확인해주세요. ';
            setAlertMessage(successMessage);
            
            // 음성 출력
            speak(successMessage, { lang: 'ko-KR' });
        } catch (error) {
            console.error('인증번호 전송 실패:', error);
            const errorMessage = '인증번호 전송에 실패했습니다.';
            setAlertMessage(errorMessage);
            
            // 음성 출력
            speak(errorMessage, { lang: 'ko-KR' });
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
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
        <SignUpContainer>
            <Title>ConnectedHub</Title>
            <SignUpBox>
                <Subtitle>회원가입</Subtitle>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <Input type="text" id="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} tabIndex="0" />
                    <Input type="password" id="signup-password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} tabIndex="0" />
                    <Input type="text" id="nickname" name="nickname" placeholder="닉네임" value={formData.nickname} onChange={handleChange} tabIndex="0" />
                    <Input type="tel" id="phoneNum" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} tabIndex="0" />
                    <Button type="button" onClick={handleSendCode} tabIndex="0">인증번호 전송</Button>
                    <Input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호" value={formData.verificationCode} onChange={handleChange} tabIndex="0" />
                    <Button type="submit" tabIndex="0">가입하기</Button>
                </form>
                <FindLinks>
                    <p>이미 계정이 있으신가요? <StyledLink onClick={handleLoginClick} tabIndex="0">로그인</StyledLink></p>
                    <p>비밀번호를 잊으셨나요? <StyledLink href="/request-reset" tabIndex="0">비밀번호 재설정</StyledLink></p>
                    <p>이메일을 잊으셨나요? <StyledLink href="/email" tabIndex="0">이메일 찾기</StyledLink></p>
                </FindLinks>
            </SignUpBox>
            {alertMessage && <AlertMessage message={alertMessage} />}
        </SignUpContainer>
    );
}

export default SignUpForm;
