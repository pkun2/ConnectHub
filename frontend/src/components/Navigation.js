import React from 'react';
import styled from 'styled-components';

// 네비게이션 바
const NavContainer = styled.nav`
  position: sticky;
  top: 10px;
  margin: 10px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background : linear-gradient(to left top, #ADD8E6, white);
  background-color: #ADD8E6;
  border-radius: 40px;
  z-index: 1000;
  opacity : 80%;
`;

// 네비게이션 아이템
const NavItem = styled.div`
  text-decoration : none; 
  font-weight : bold;
  padding : 30px 35px;
  text-align : center;
  border-radius : 15px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px #44C2FF;
  }
`;

// 제목
const NavTitle = styled(NavItem)`
  color: #426B1F;
  font-size: 30pt;
`;

// 로그인하러 가기
const NavGotoLogin = styled(NavItem)`
  background-color: #426B1F;
  box-shadow: 0 2px 15px black;
  font-size : 20pt;
  margin-right: 10px;
`;

function Navigation() {
  return (
    <NavContainer>
      <NavTitle onClick={() => window.location.href='http://localhost:3000/'}> ConnectHub </NavTitle>
      <div/> <div/> <div/> <div/> <div/>
      <NavGotoLogin onClick={() => window.location.href='https://naver.com/'}> 로그인하러 가기 </NavGotoLogin>
    </NavContainer>
  );
}

export default Navigation;
