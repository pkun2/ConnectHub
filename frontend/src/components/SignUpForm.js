// SignUpForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // useHistory import 추가
import { SignUpContainer, SignUpBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './SignUpStyle';

function SignUpForm() {
    const [formData, setFormData] = useState({
        email: '', 
        nickname: '',
        phoneNum: '',
        password: ''
    });

    const history = useHistory(); // useHistory 사용

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // 인증 코드 유효성 검사 및 회원가입 요청
            const response = await axios.post('http://localhost:4000/api/signup', formData);
            console.log(response.data);

            // 회원가입 성공 시 메인 화면으로 이동
            history.push('/');
        } catch (error) {
            console.error('회원가입 실패:', error);
            window.alert('회원가입 도중 오류가 발생했습니다. 인증 코드를 확인해 주세요.'); // 팝업창으로 실패 메시지 표시
        }
    };

    const handleSendCode = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/sendVerificationCode', { phoneNum: formData.phoneNum });
            console.log(response.data);
        } catch (error) {
            console.error('인증번호 전송 실패:', error);
        }
    };

    return (
        <SignUpContainer>
            <Title>ConnectedHub</Title>
            <SignUpBox>
                <Subtitle>회원가입</Subtitle>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <Input type="text" id="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
                    <Input type="password" id="signup-password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                    <Input type="text" id="nickname" name="nickname" placeholder="닉네임" value={formData.nickname} onChange={handleChange} />
                    <Input type="tel" id="phoneNum" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} />
                    <Button type="button" onClick={handleSendCode}>인증번호 전송</Button>
                    <Input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호" value={formData.verificationCode} onChange={handleChange} />
                    <Button type="submit">가입하기</Button>
                </form>
                <FindLinks>
                    <p>이미 계정이 있으신가요? <StyledLink href="/login">로그인</StyledLink></p>
                </FindLinks>
            </SignUpBox>
        </SignUpContainer>
    );
}

export default SignUpForm;
