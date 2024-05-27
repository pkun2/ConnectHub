import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 로그인 아이디 비밀번호 찾기 회원가입 버튼 컨테이너
const LoginRegisterContainer = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// 로그인하기 버튼
const Login = styled.div`
    margin-top: 15px;
    cursor: pointer;
    text-align: center;
    background : linear-gradient(to left top, #ADD8E6, white);
    font-size: 16pt;
    font-weight : bold;
    padding: 15px 30px;
    width: 200px;
    border-radius: 10px;
    &:hover {
        background : linear-gradient(to left top, #ADD8E6, skyblue);
      }
`;

// 아이디 비번 찾기 회원가입 컨테이너
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: low;
  justify-content: space-around;
  width: inherit; /* 부모로부터 상속받는다 */
`;

// 회원가입 버튼 (아이디 비번 찾기 버튼)
const Register = styled.div`
    cursor: pointer;
    text-align: center;
    font-size: 10pt;
    font-weight : 500;
    margin: 15px 10px;
    white-space: nowrap;
    &:hover {
        text-decoration: underline;
      }
`;


const NonLogin = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <LoginRegisterContainer>
      <Login onClick={handleLoginClick}> 로그인 </Login>
      <RegisterContainer>
        <Register> 아이디 찾기 </Register>
        <Register> 비밀번호 찾기 </Register>
        <Register> 회원가입 </Register>
      </RegisterContainer>
    </LoginRegisterContainer>
  );
};

export default NonLogin;
