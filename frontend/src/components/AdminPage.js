import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import Foot from './Foot';

// 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0px;
  margin: 90px 200px 176px 200px; 
`;

const Header = styled.div`
  position: relative;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
`;

const HeaderItem = styled.div`
  flex: ${({ isSection, isTitle }) => (
    isSection ? 1.5 : 
    isTitle ? 1 : 
    0.5
  )};
  text-align: left;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
`;

const SectionHeader = styled.div`
  position: relative;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const SectionHeaderItem = styled.div`
  flex: ${({ isSection, isTitle }) => (
    isSection ? 1.5 : 
    isTitle ? 1 : 
    0.5
  )};
  text-align: left;
  text-align: center;
  white-space: nowrap;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 게시글 관리 컨테이너
const PostManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 800px;
  overflow-y: auto;
`;

// 댓글 관리 컨테이너
const CommentManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 800px;
  overflow-y: auto;
`;

// 회원 관리 컨테이너
const UserManagementContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 800px;
  overflow-y: auto;
`;


// 통계 컨테이너
const StatisticContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  margin-left: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 800px;
  overflow-y: auto;
`;

// 총 방문자 수 컨테이너
const VisitorContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 615.6px;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

// 삭제 버튼
const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  text-align: center;
  font-size: 11pt;
  font-weight: 550;
  width: 60px;
  background-color: white;
  cursor: pointer;
  border: 1.5px solid #BDBDBD;
`;

const AdminPage = () => {

  return (
    <>
        <Navigation/>
        <Option/>
        <MainContainer>
          <PostManagementContainer>
            <Header>
              <HeaderItem isTitle>게시글 제목</HeaderItem>
              <HeaderItem isSection>내용</HeaderItem>
            </Header>
            <SectionHeader>
              <SectionHeaderItem isTitle>제목</SectionHeaderItem>
              <SectionHeaderItem isSection>~~~</SectionHeaderItem>
              <DeleteButton>삭제</DeleteButton>
            </SectionHeader>
          </PostManagementContainer>
          <CommentManagementContainer>
            <Header>
              <HeaderItem isTitle>게시글 제목</HeaderItem>
              <HeaderItem>회원아이디</HeaderItem>
              <HeaderItem isSection>댓글 내용</HeaderItem>
            </Header>
            <SectionHeader>
              <SectionHeaderItem isTitle>제목</SectionHeaderItem>
              <SectionHeaderItem>test</SectionHeaderItem>
              <SectionHeaderItem isSection>~~~</SectionHeaderItem>
              <DeleteButton>삭제</DeleteButton>
            </SectionHeader>
          </CommentManagementContainer>
          <Container>
            <UserManagementContainer>
              <Header>
                <HeaderItem isTitle>회원아이디</HeaderItem>
                <HeaderItem>신고 누적</HeaderItem>
              </Header>
            </UserManagementContainer>
            <StatisticContainer>
              <Header>
                <HeaderItem>날짜</HeaderItem>
                <HeaderItem>방문자 수</HeaderItem>
              </Header>
              
              <VisitorContainer>
                <HeaderItem isTitle>총 방문자 수</HeaderItem>
                <HeaderItem>0</HeaderItem>
              </VisitorContainer>
            </StatisticContainer>
          </Container>
        </MainContainer>
        <Foot/>
    </>
  );
}

export default AdminPage;