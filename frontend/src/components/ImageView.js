import React from 'react';
import styled from 'styled-components';

// 이미지뷰
const IntroContainer = styled.div`
  width: 100%;
  height: 740px;
  background-image: url('${props => props.backgroundImage}');
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: auto;
  border-bottom: 2px solid #8DDDF1;
`;

function ImageView({ backgroundImage }) {
  return (
    <IntroContainer backgroundImage={backgroundImage} />
  );
}

export default ImageView;
