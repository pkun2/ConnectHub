// SignUpForm.js
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
            // const response = await axios.post('api/signup', formData);
            const response = await axios({
                method:"post",
                baseURL:"http://localhost:4000/api",
                url:"signup"
            })

            console.log(response.data);
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };    

    return (
        <SignUpContainer>
            <Title>ConnectedHub</Title>
            <SignUpBox>
                <Subtitle>회원가입</Subtitle>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <Input type="text" id="userId" name="userId" placeholder="아이디" value={formData.userId} onChange={handleChange} /> {/* 수정된 부분: name="username" -> name="userId" */}
                    <Input type="text" id="nickname" name="nickname" placeholder="닉네임" value={formData.nickname} onChange={handleChange} />
                    <Input type="email" id="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
                    <Input type="password" id="signup-password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
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
