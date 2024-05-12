import React from 'react';
import { SignUpContainer, SignUpBox, Title, Subtitle, Input, Button, FindLinks, StyledLink } from './SignUpStyle';

function SignUpForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <SignUpContainer>
            <Title>ConnectedHub</Title>
            <SignUpBox>
                <Subtitle>회원가입</Subtitle>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <Input type="text" id="username" name="username" placeholder="아이디" />
                    <Input type="text" id="nickname" name="nickname" placeholder="닉네임" />
                    <Input type="email" id="email" name="email" placeholder="이메일" />
                    <Input type="password" id="password" name="password" placeholder="비밀번호" />
                    <Button type="submit">가입하기</Button>
                </form>
                <FindLinks>
                    <p>이미 계정이 있으신가요? <StyledLink href="#" linkColor="#ADD8E6">로그인</StyledLink></p>
                </FindLinks>
            </SignUpBox>
        </SignUpContainer>
    );
}

export default SignUpForm;
