import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// 위로 가기 버튼 스타일
const GotoAdminButton = styled.div`
  position: fixed;
  bottom: 200px;
  right: 20px;
  cursor: pointer;
  width: 80px;
  height: 80px;
  line-height: 70px;
  display: block;
  color: black;
  background : linear-gradient(to left top, #ADD8E6, white);
  box-shadow: 0 0 10px black;
  border-radius: 50%;
  text-align: center;
  font-size: 10pt;
  font-weight: bold;
  z-index: 1000;
`;

function GotoAdmin({autht}) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToAdmin = () => {
    navigate('/admin');
  };

  // 현재 경로가 '/admin'이면 버튼을 렌더링하지 않음
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <GotoAdminButton onClick={goToAdmin}>
      관리자페이지
    </GotoAdminButton>
  );
}

export default GotoAdmin;
