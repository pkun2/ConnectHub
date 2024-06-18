import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import axios from 'axios';

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
  flex: ${({ isSection, isTitle }) => (isSection ? 1.5 : isTitle ? 1 : 0.5)};
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
  flex: ${({ isSection, isTitle }) => (isSection ? 1.5 : isTitle ? 1 : 0.5)};
  text-align: left;
  text-align: center;
  white-space: nowrap;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const VisitorContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

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
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [reports, setReports] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [todayVisitors, setTodayVisitors] = useState({ visitDate: '', count: 0 });
  const [totalVisitors, setTotalVisitors] = useState({ count: 0 });

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchReports();
    fetchStatistics();
    getCurrentDate();  // 현재 날짜 가져오는 함수 호출
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setCurrentDate(formattedDate);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('게시글을 가져오는 중 오류 발생:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/comments');
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 가져오는 중 오류 발생:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/reports');
      setReports(response.data);
    } catch (error) {
      console.error('신고정보를 가져오는 중 오류 발생:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const todayResponse = await axios.get('http://localhost:4000/api/admin/visit/today');
      setTodayVisitors(todayResponse.data); 
      
      const totalResponse = await axios.get('http://localhost:4000/api/admin/visit/total');
      setTotalVisitors(totalResponse.data);
    } catch (error) {
      console.error('방문자 수를 가져오는 중 오류 발생:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/admin/delete/post/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/admin/delete/comment/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  return (
    <>
      <Navigation />
      <MainContainer>
        <PostManagementContainer>
          <Header>
            <HeaderItem isTitle>게시글 제목</HeaderItem>
            <HeaderItem isSection>내용</HeaderItem>
          </Header>
          {posts.map(post => (
            <SectionHeader key={post.postId}>
              <SectionHeaderItem isTitle>{post.title}</SectionHeaderItem>
              <SectionHeaderItem isSection>{post.content}</SectionHeaderItem>
              <DeleteButton onClick={() => handleDeletePost(post.postId)}>삭제</DeleteButton>
            </SectionHeader>
          ))}
        </PostManagementContainer>
        <CommentManagementContainer>
          <Header>
            <HeaderItem isTitle>게시글 제목</HeaderItem>
            <HeaderItem>작성자</HeaderItem>
            <HeaderItem isSection>댓글 내용</HeaderItem>
          </Header>
          {comments.map(comment => (
            <SectionHeader key={comment.commentId}>
              <SectionHeaderItem isTitle>{comment.title}</SectionHeaderItem>
              <SectionHeaderItem>{comment.nickname}</SectionHeaderItem>
              <SectionHeaderItem isSection>{comment.content}</SectionHeaderItem>
              <DeleteButton onClick={() => handleDeleteComment(comment.commentId)}>삭제</DeleteButton>
            </SectionHeader>
          ))}
        </CommentManagementContainer>
        <Container>
          <UserManagementContainer>
            <Header>
              <HeaderItem>신고 종류</HeaderItem>
              <HeaderItem isTitle>게시글</HeaderItem>
              <HeaderItem>신고 내용</HeaderItem>
            </Header>
            {reports.map(report => (
              <SectionHeader key={report.reportId}>
                <SectionHeaderItem>{report.type}</SectionHeaderItem>
                <SectionHeaderItem isTitle>{report.title}</SectionHeaderItem>
                <SectionHeaderItem>{report.content}</SectionHeaderItem>
              </SectionHeader>
            ))}
          </UserManagementContainer>
          <StatisticContainer>
            <Header>
              <HeaderItem>현재 날짜</HeaderItem>
              <HeaderItem>오늘 방문자 수</HeaderItem>
              <HeaderItem>총 방문자 수</HeaderItem>
            </Header>
            <SectionHeader>
              <SectionHeaderItem>{currentDate}</SectionHeaderItem>
              <SectionHeaderItem>{todayVisitors.count || '...로딩중'}</SectionHeaderItem>
              <SectionHeaderItem>{totalVisitors.count || '...로딩중'}</SectionHeaderItem>
            </SectionHeader>
          </StatisticContainer>
        </Container>
      </MainContainer>
    </>
  );
  
  
}  

export default AdminPage;
