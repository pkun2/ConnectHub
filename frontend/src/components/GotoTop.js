import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 위로 가기 버튼 스타일
const GotoTopButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  width: 80px;
  height: 80px;
  line-height: 70px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  color: white;
  background-color: black;
  box-shadow: 0 0 10px black;
  border-radius: 50%;
  text-align: center;
  font-size: 30pt;
  z-index: 1000;
`;

function GotoTop() {
  const [showButton, setShowButton] = useState(false); // 버튼을 보이게 할지 여부를 관리하는 상태

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 현재 스크롤 위치 가져오기
    const scrollPosition = window.scrollY;

    // 스크롤 위치가 특정 값 이상이면 버튼을 보이게 설정
    setShowButton(scrollPosition > 1);
  };

  // 컴포넌트가 마운트된 후 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 버튼 클릭 시 맨 위로 스크롤
  const handleGotoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GotoTopButton show={showButton} onClick={handleGotoTop}>
      ↑
    </GotoTopButton>
  );
}

export default GotoTop;