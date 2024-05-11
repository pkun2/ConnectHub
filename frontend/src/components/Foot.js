import React from 'react';
import styled from 'styled-components';

// 하단바
const Footbar = styled.footer`
  height: 120px;
  margin: 0;
  padding: 0;
  background: linear-gradient(to left top, #E6FFFF, white);
  box-shadow: 0 0 10px #E6FFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Foot() {
  return (
    <Footbar>
      <p> ConnectHub / 이메일: connecthub@naver.com / 주소: 충남 아산시 선문로221번길 70 선문대학교 / FAX: +00-00-000-0000 </p>
      <p> Copyright © ConnectHub 2024. All rights reserved. </p>
    </Footbar>
  );
}

export default Foot;