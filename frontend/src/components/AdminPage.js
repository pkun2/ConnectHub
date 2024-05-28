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
  margin: 50px 200px 176px 200px; 
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
  margin-bottom: 10px;
  margin-bottom: 0px;
`;

const HeaderItem = styled.div`
  flex: ${({ isID }) => (isID ? 1.5 : 1)};
  text-align: left;
  font-weight: bold;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

// 회원 관리 컨테이너
const UserManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  height: 600px;
`;

// 회원 관리 컨테이너
const PostManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  height: 600px;
`;

// 회원 관리 컨테이너
const CommentManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  height: 600px;
`;

// 회원 관리 컨테이너
const StatisticContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  height: 600px;
`;

const AdminPage = () => {

  return (
    <>
        <Navigation/>
        <Option/>
        <MainContainer>
            <Container>
                <UserManagementContainer>
                </UserManagementContainer>
                <PostManagementContainer></PostManagementContainer>
            </Container>
            <Container>
                <CommentManagementContainer></CommentManagementContainer>
                <StatisticContainer></StatisticContainer>
            </Container>
        </MainContainer>
        <Foot/>
    </>
  );
}

export default AdminPage;