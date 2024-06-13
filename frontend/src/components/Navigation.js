import React from 'react';
import styled from 'styled-components';
import Notification from './Notification';

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
  z-index: 1000;
  opacity : 80%;
  overflow-x: auto; /* 가로로 내용이 넘칠 경우 가로 스크롤 생성 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
  margin: 0 200px; /* 양쪽에 20px의 공백 추가 */
`;

// 네비게이션 아이템
const NavItem = styled.div`
  text-decoration : none; 
  font-weight : bold;
  padding : 20px 20px;
  text-align : center;
  cursor: pointer;
`;

// 제목
const NavTitle = styled(NavItem)`
  display: flex;
  justify-content: center;
  color: #426B1F;
  font-size: 30pt;
`;

// 제목 아이콘
const NavTitleIcon = styled.img`
  position: relative;
  left: 0;
  margin-right: 35px;
`;

function Navigation() {

  return (
    <NavContainer>
      <NavTitle onClick={() => window.location.href='http://localhost:4000/'}> 
        <NavTitleIcon src="./mainlogo.png" />
        ConnectHub 
      </NavTitle>
      <div/> <div/> <div/> <div/> <div/> 
      <Notification/>
      <div/>
    </NavContainer>
  );
}

export default Navigation;