// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { LoginContainer, LoginBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './LoginStyle';

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await axios.post('api/login', formData);
            console.log(response.data);
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    return (
        <LoginContainer>
            <Title>ConnectedHub</Title>
            <LoginBox>
                <Subtitle>로그인</Subtitle>
                <form id="login-form" onSubmit={handleSubmit}>
                    <Input type="text" id="username" name="username" placeholder="아이디" value={formData.username} onChange={handleChange} />
                    <Input type="password" id="login-password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                    <Button type="submit">로그인</Button>
                </form>
                <FindLinks>
                    <StyledLink href="/signup">회원가입</StyledLink>
                </FindLinks>
            </LoginBox>
        </LoginContainer>
    );
}

export default LoginForm;
