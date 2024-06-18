import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import ImageSection from './ImageSection';
import BoardSection from './BoardSection';
import ProfileSection from './ProfileSection';
import MenuSection from './MenuSection';
import NonLogin from './NonLogin';
import { AuthContext } from './AuthContext';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 1550px;
  padding-top: 0px;
  margin: 0 200px 100px 200px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const LeftSubContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px;
  margin: 20px 20px;
`;

const RightSubContainer = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px;
  border: 1.8px solid #E4E4E4;
`;

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체게시판");
  const [selectcategoryNum, setSelectcategoryNum] = useState(null);
  const { authToken } = useContext(AuthContext);

  const handleCategoryChange = (value) => {
    switch (value) {
      case '0':
        setSelectedCategory("전체게시판");
        setSelectcategoryNum(null);
        break;
      case '1':
        setSelectedCategory("자유게시판");
        setSelectcategoryNum(1);
        break;
      case '2':
        setSelectedCategory("공지사항");
        setSelectcategoryNum(2);
        break;
      case '3':
        setSelectedCategory("정부 혜택");
        setSelectcategoryNum(3);
        break;
      case '4':
        setSelectedCategory("정보게시판");
        setSelectcategoryNum(4);
        break;
      default:
        break;
    }
  
  };

  return (
    <>
      <Navigation />
      <Option />
      <MainContainer>
        <LeftSubContainer>
          <ImageSection imageUrl="https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826" />
          <BoardSection title={selectedCategory} onCategoryChange={handleCategoryChange} selectcategoryNum = {selectcategoryNum}/>
        </LeftSubContainer>
        <RightSubContainer>
        {authToken ? <ProfileSection /> : <NonLogin /> }
          <MenuSection onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
        </RightSubContainer>
      </MainContainer>
    </>
  );
};

export default Main;
