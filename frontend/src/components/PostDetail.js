import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import ImageSection from './ImageSection';
import ProfileSection from './ProfileSection';
import MenuSection from './MenuSection';

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
  width: calc(100% - 40px);
`;

const RightSubContainer = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px;
  border: 1.8px solid #E4E4E4;
`;

const DetailContainer = styled.div`
  width: 90%;
  padding: 20px;
  margin: 20px 0;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const TitleContainer = styled.div`
  margin-bottom: 10px;
  text-align: left;
  margin: 0 30px 0px 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 30px 0px 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd; 
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  font-size: 2.0em;
  margin: 0 30px 30px 30px;
  word-break: break-word;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  width: 90%;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 1em;
  cursor: pointer;
  background-color: #add8e6;
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#0056b3'};
  }
`;

const CommentSection = styled.div`
  margin-top: 30px;
  width: 90%;
  padding: 10px;
  border-top: 1px solid #ddd;
  margin: 0 30px 30px 30px;
`;

const CommentInput = styled.input`
  width: calc(100% - 20px);
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CommentButton = styled(Button)`
  background-color: #add8e6;
  &:hover {
    background-color: #0056b3;
  }
`;

const PostDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체게시판');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() === '') return;

    const newComment = {
      id: comments.length + 1,
      author: '사용자 닉네임',
      text: comment,
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  const post = {
    title: '게시물 제목',
    content: '게시물 내용',
    author: '작성자 이름',
    date: '2024-05-21',
    profileImageUrl: 'https://via.placeholder.com/50',
  };

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
  };

  return (
    <>
      <Navigation />
      <Option />
      <MainContainer>
        <LeftSubContainer>
          <ImageSection imageUrl="https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826" />
          <DetailContainer>
            <TitleContainer>
              <h1>{post.title}</h1>
            </TitleContainer>
            <InfoContainer>
              <ProfileImage src={post.profileImageUrl} alt="Profile" />
              <div>
                <p>{post.author}</p>
                <p>{post.date}</p>
              </div>
            </InfoContainer>
            <ContentContainer>
              <p>{post.content}</p>
            </ContentContainer>
            <CommentSection>
              <h2>댓글</h2>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p><strong>{comment.author}:</strong> {comment.text}</p>
                </div>
              ))}
              <CommentInput 
                type="text" 
                placeholder="댓글을 입력하세요" 
                value={comment}
                onChange={handleCommentChange}
              />
              <CommentButton onClick={handleCommentSubmit}>등록</CommentButton>
            </CommentSection>
          </DetailContainer>
          <ButtonContainer>
            <Button onClick={handleEdit}>
              수정
            </Button>
            <Button onClick={handleDelete}>
              삭제
            </Button>
          </ButtonContainer>
        </LeftSubContainer>
        <RightSubContainer>
          <ProfileSection />
          <MenuSection
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
        </RightSubContainer>
      </MainContainer>
    </>
  );
};

export default PostDetail;