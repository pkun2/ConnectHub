import React from 'react';
import styled from 'styled-components';

// 텍스트를 넣을 컨테이너
const TextContainer = styled.div`
  width: 50%;
  height: 100%; 
  display: flex;
  flex-direction: column; /* 수직 정렬을 위해 컬럼으로 변경 */
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 37px;
  color: #333;
  font-weight: bold;
  margin: 20px 20px;
`;

const Text2 = styled.span`
  font-size: 22px;
  color: #333;
  font-weight: Roboto;
`;

const WelcomeText = () => (
  <> 
    <TextContainer>
      <Text>게시판에 오신것을 환영합니다.</Text>
      <Text2>장애인분들을 위한 게시판입니다!</Text2>
      <Text2>게시판을 통해서 소통해요!</Text2>
      <Text2>여러분의 소중한 의견을 기다립니다!</Text2>
    </TextContainer>
  </>
);

export default WelcomeText;
