import React from 'react';
import { LoginContainer, LoginBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './LoginStyle';

function LoginForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <LoginContainer>
            <Title>ConnectedHub</Title>
            <LoginBox>
                <Subtitle>로그인</Subtitle>
                <form id="login-form" onSubmit={handleSubmit}>
                    <Input type="text" id="id" name="id" placeholder="아이디" />
                    <Input type="password" id="password" name="password" placeholder="비밀번호" />
                    <Button type="submit">로그인</Button>
                </form>
                <FindLinks>
                    <StyledLink href="#">회원가입</StyledLink>
                </FindLinks>
            </LoginBox>
        </LoginContainer>
    );
}

export default LoginForm;
