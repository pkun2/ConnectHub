import React from 'react';
import styled from 'styled-components';
import WelcomeText from './WelcomeText'

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

const imageUrl = "https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826"

const ImageSection = () => (
  <ImageContainer>
    <WelcomeText/>
    <PictureContainer>
      <Image src={imageUrl} alt="그림" />
    </PictureContainer>
  </ImageContainer>
);

export default ImageSection;
