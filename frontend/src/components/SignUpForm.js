import React, { useState } from 'react';
import axios from 'axios';
import { SignUpContainer, SignUpBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './SignUpStyle';

function SignUpForm() {
    const [formData, setFormData] = useState({
        userId: '',
        nickname: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/signup', formData);
            console.log(response.data);
            alert('회원가입이 완료되었습니다. 이메일을 확인해 주세요.');
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
        }
    };

    return (
        <SignUpContainer>
            <Title>ConnectedHub</Title>
            <SignUpBox>
                <Subtitle>회원가입</Subtitle>
                <form onSubmit={handleSubmit}>
                    <Input type="text" name="userId" placeholder="아이디" value={formData.userId} onChange={handleChange} required />
                    <Input type="text" name="nickname" placeholder="닉네임" value={formData.nickname} onChange={handleChange} required />
                    <Input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} required />
                    <Input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
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
