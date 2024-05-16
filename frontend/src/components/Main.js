import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import WelcomeText from './WelcomeText';
import ImageSection from './ImageSection';
import BoardSection from './BoardSection';
import ProfileSection from './ProfileSection';
import MenuSection from './MenuSection';

// 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 1503px;
  padding-top: 0px;
  margin: 0 200px 100px 200px;
  overflow-x: auto;
  overflow-y: hidden;
`;

// 좌측 컨테이너
const LeftSubContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px;
  margin: 20px 20px;
`;

// 우측 컨테이너
const RightSubContainer = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px;
  border: 1.8px solid #E4E4E4;
`;

const Main = () => {
  // 비어있는 컨텐츠를 만듭니다.
  const numberOfEmptyContents = 18;
  const emptyContents = Array.from({ length: numberOfEmptyContents }, (_, index) => ({ id: index }));

  return (
    <>
      <Navigation/>
      <Option/>
      <MainContainer>
        <LeftSubContainer>
          <ImageSection imageUrl="https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826" />
          <BoardSection title="전체 게시판" contents={emptyContents} />
        </LeftSubContainer>
        <RightSubContainer>
          <ProfileSection />
          <MenuSection />
        </RightSubContainer>
      </MainContainer>
    </>
  );
};

export default Main;
