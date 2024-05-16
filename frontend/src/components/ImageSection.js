import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%;
  background-position: center;
  outline: 3px double #44C2FF;
`;

const PictureContainer = styled.div`
  width: 50%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 110%;
  height: 110%;
`;

const ImageSection = ({ imageUrl }) => (
  <ImageContainer>
    <PictureContainer>
      <Image src={imageUrl} alt="그림" />
    </PictureContainer>
  </ImageContainer>
);

export default ImageSection;
