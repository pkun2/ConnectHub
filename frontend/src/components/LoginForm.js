import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContainer, LoginBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './LoginStyle';
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import

function LoginForm() {
    const [alertMessage, setAlertMessage] = useState(''); // tts, alertMessage state 추가

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // useHistory 사용

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }; // 인증 헤더를 반환하는 함수 이걸로 사용하시면 됩니다.

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try { // 서버에 POST 요청 보냄
            const response = await axios.post("http://localhost:4000/api/user/login", formData);
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            const successMessage = '로그인에 성공하였습니다.';
            setAlertMessage(successMessage);
            
            // 음성 출력이 끝난 후 화면 전환
            speak(successMessage, { lang: 'ko-KR' }).then(() => {
                navigate('/');
                window.location.reload();
            });
        } catch (error) {
            console.error('로그인 실패:', error);
            const errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.';
            setAlertMessage(errorMessage);
            
            // 음성 출력
            speak(errorMessage, { lang: 'ko-KR' });
        }
    };

    // tts, 음성 출력 및 탭으로 포커싱 및 엔터 키로 작동 설정
    useEffect(() => {
        const tabs = document.querySelectorAll('[tabindex]');

        const handleFocus = (event) => {
            const text = event.target.placeholder || event.target.textContent || '';
            speak(text);
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
        <LoginContainer>
            <Title onClick={() => window.location.href='http://localhost:3000/'}>ConnectedHub</Title>
            <LoginBox>
                <Subtitle>로그인</Subtitle>
                <form id="login-form" onSubmit={handleSubmit}>
                    <Input type="text" id="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} tabIndex="0" />
                    <Input type="password" id="login-password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} tabIndex="0" />
                    <Button type="submit" tabIndex="0">로그인</Button>
                </form>
                <FindLinks>
                    <StyledLink onClick={handleSignUpClick} tabIndex="0">회원가입</StyledLink>
                </FindLinks>
            </LoginBox>
            {alertMessage && <AlertMessage message={alertMessage} />} {/* AlertMessage 추가 */}
        </LoginContainer>
    );
}

export default LoginForm;
