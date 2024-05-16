import React from 'react';
import styled from 'styled-components';

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
    <Text>게시판에 오신것을 환영합니다.</Text>
    <Text2>장애인분들을 위한 게시판입니다!</Text2>
    <Text2>게시판을 통해서 소통해요!</Text2>
    <Text2>여러분의 소중한 의견을 기다립니다!</Text2>
  </>
);

export default WelcomeText;
