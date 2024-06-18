import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContainer, LoginBox, Title, Subtitle, Input, Button, FindLinks, StyledLink, Button2 } from './LoginStyle';
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import
import AlertMessage from '../speech/alertMessage'; // tts, 음성으로 알려줄 경고 메시지 컴포넌트 import
import { AuthContext } from './AuthContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // stt 사용을 위한 import

function LoginForm() {
    const [alertMessage, setAlertMessage] = useState(''); // tts, alertMessage state 추가
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // useHistory 사용
    const { login } = useContext(AuthContext);

    const [isListeningForEmail, setIsListeningForEmail] = useState(false); // 이메일 또는 비밀번호를 구분하기 위한 state

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            console.error("브라우저가 음성 인식을 지원하지 않습니다.");
            return;
        }

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

        const tabs = document.querySelectorAll('[tabindex]');
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
            const { token, userId, nickname } = response.data;
            login(token, userId, nickname);

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

    const handleVoiceEmailInput = () => {
        setIsListeningForEmail(true);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false });
    };

    const handleVoicePasswordInput = () => {
        setIsListeningForEmail(false);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false });
    };

    useEffect(() => {
        if (!listening) {
            if (transcript) {
                let updatedTranscript = transcript;
                
                // STT 결과에서 특수 문자 변환
                if (isListeningForEmail) {
                    updatedTranscript = updatedTranscript.replace(' 골뱅이 ', '@');
                    setFormData(prevData => ({ ...prevData, email: updatedTranscript }));
                    speak('이메일이 입력되었습니다.', { lang: 'ko-KR' });
                } else {
                    updatedTranscript = updatedTranscript.replace(' 골뱅이 ', '@');
                    setFormData(prevData => ({ ...prevData, password: updatedTranscript }));
                    speak('비밀번호가 입력되었습니다.', { lang: 'ko-KR' });
                }
            }
        }
    }, [listening, transcript, isListeningForEmail]);

    return (
        <LoginContainer>
            <Title onClick={() => window.location.href='http://localhost:3000/'} tabIndex="0">ConnectedHub</Title>
            <LoginBox>
                <Subtitle>로그인</Subtitle>
                <form id="login-form" onSubmit={handleSubmit}>
                    <Input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="이메일" 
                        value={formData.email} 
                        onChange={handleChange} 
                        tabIndex="0" 
                    />
                    <Button type="button" tabIndex="0" onClick={handleVoiceEmailInput}>음성으로 이메일 입력</Button>
                    <Input 
                        type="password" 
                        id="login-password" 
                        name="password" 
                        placeholder="비밀번호" 
                        value={formData.password} 
                        onChange={handleChange} 
                        tabIndex="0" 
                    />
                    <Button type="button" tabIndex="0" onClick={handleVoicePasswordInput}>음성으로 비밀번호 입력</Button>
                    <Button2 type="submit" tabIndex="0">로그인</Button2>
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
