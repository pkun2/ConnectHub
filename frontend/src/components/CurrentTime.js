import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 시계 스타일
const BoxSideClock = styled.div`
  background : linear-gradient(to left top, white, #E6FFFF);
  border-radius : 10px;
  box-shadow : 0 0 1px #44C2FF;
  height : 80px;
  margin : 20px;
  display : flex;
  align-items : center;
  justify-content : center;
  font-size : 20pt;
  text-decoration : none; 
  font-weight : bold;
  padding : 30px 70px;
`;

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(""); // 현재 시간 state

  // 시계 업데이트 함수
  const updateClock = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    setCurrentTime(`${period} ${formattedHours} : ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`);
  };

  // 컴포넌트가 마운트된 후 시계 업데이트 시작
  useEffect(() => {
    const intervalId = setInterval(updateClock, 1000); // 1초마다 시계 업데이트
    return () => clearInterval(intervalId); // 언마운트될 때 interval 정리
  }, []);

  return (
    <BoxSideClock>
      <div className="currenttime">{currentTime}</div>
    </BoxSideClock>
  );
}

export default CurrentTime;
