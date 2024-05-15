import React from 'react';
import styled from 'styled-components';

// 네비게이션 바
const NavContainer = styled.nav`
  position: relative; /* 화면 상단 설정 */
  top: 0;
  left: 0;
  width: 100%
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background : linear-gradient(to left top, #ADD8E6, white);
  background-color: #ADD8E6;
  z-index: 1000;
  opacity : 80%;
  border: 2px solid #000; /* 외곽선 추가 */
  overflow-x: auto; /* 가로로 내용이 넘칠 경우 가로 스크롤 생성 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
  margin: 0 200px; /* 양쪽에 20px의 공백 추가 */
`;

// 네비게이션 아이템
const NavItem = styled.div`
  text-decoration : none; 
  font-weight : bold;
  padding : 30px 35px;
  text-align : center;
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