import React, { useState } from 'react';
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
  &:hover {
    box-shadow: 0 0 10px #44C2FF;
  }
`;

// 제목
const NavTitle = styled(NavItem)`
  display: flex;
  justify-content: center;
  color: #426B1F;
  font-size: 30pt;
`;

// 알림아이콘
const NotificationIcon = styled.img`
  position: absolute;
  width: 50px;
  top: 50%;
  transform: translateY(-50%);
  right: 140px;
  margin: 0;
  cursor: pointer;
`;

// 알림설정아이콘
const NotificationOptionIcon = styled.img`
  position: absolute;
  width: 50px;
  top: 50%;
  transform: translateY(-50%);
  right: 60px;
  margin: 0;
  cursor: pointer;
`;

// 전체 화면을 흐리게 만드는 오버레이
const Modal_Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정색 */
  z-index: 999; /* 모달보다 낮은 레벨 */
`;

// 알림창
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 가장 높은 레벨 */
  width: 500px;
  height: 800px;
`;

function Navigation() {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <NavContainer>
      <NavTitle onClick={() => window.location.href='http://localhost:3000/'}> ConnectHub </NavTitle>
      <div/> <div/> <div/> <div/>
      <NotificationIcon onClick={handleOpenModal} src='https://cdn.icon-icons.com/icons2/1993/PNG/512/alarm_alert_attention_bell_clock_notification_ring_icon_123203.png'/>
      {showModal && (
        <>
          <Modal_Overlay onClick={handleCloseModal} />
          <Modal>
            <button onClick={handleCloseModal}>닫기</button>
          </Modal>
        </>
      )}
      <NotificationOptionIcon src='https://cdn.icon-icons.com/icons2/3106/PNG/512/gear_settings_options_icon_191642.png' alt='옵션' />
      <div/>
    </NavContainer>
  );
}

export default Navigation;