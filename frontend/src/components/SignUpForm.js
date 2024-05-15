// SignUpForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { SignUpContainer, SignUpBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './SignUpStyle';


function SignUpForm() {
    // 상태 초기화
    const [formData, setFormData] = useState({
        userId: '', 
        nickname: '',
        phone: '',
        password: '',
        verificationCode: ''
    });

    // 입력값 변경을 위한 핸들러 함수
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Form 제출 핸들러 함수
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // 서버에 POST 요청 보내기
            const response = await axios.post('http://localhost:4000/api/signup', formData);
            console.log(response.data);
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };

    // 인증번호 전송 핸들러 함수
    const handleSendCode = async () => {
        try {
            // 서버에 POST 요청 보내기
            const response = await axios.post('http://localhost:4000/api/sendVerificationCode', { phone: formData.phone });
            console.log(response.data);
        } catch (error) {
            console.error('인증번호 전송 실패:', error);
        }
    };

    // 인증번호 확인 핸들러 함수
    const handleVerifyCode = async () => {
        try {
            // 서버에 POST 요청 보내기
            const response = await axios.post('http://localhost:4000/api/verifyVerificationCode', { phone: formData.phone, code: formData.verificationCode });
            console.log(response.data);
        } catch (error) {
            console.error('인증번호 확인 실패:', error);
        }
    };

    // SignUpForm 구성
    return (
        <SignUpContainer>
            <Title>ConnectedHub</Title>
            <SignUpBox>
                <Subtitle>회원가입</Subtitle>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <Input type="text" id="userId" name="userId" placeholder="아이디" value={formData.userId} onChange={handleChange} />
                    <Input type="password" id="signup-password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                    <Input type="text" id="nickname" name="nickname" placeholder="닉네임" value={formData.nickname} onChange={handleChange} />
                    <Input type="tel" id="phone" name="phone" placeholder="전화번호" value={formData.phone} onChange={handleChange} />
                    <Button type="button" onClick={handleSendCode}>인증번호 전송</Button>
                    <Input type="text" id="verificationCode" name="verificationCode" placeholder="인증번호" value={formData.verificationCode} onChange={handleChange} />
                    <Button type="button" onClick={handleVerifyCode}>인증번호 확인</Button>
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
