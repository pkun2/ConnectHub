import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import ImageSection from './ImageSection';
import ProfileSection from './ProfileSection';
import MenuSection from './MenuSection';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useParams } from 'react-router-dom';
import ReportModal from './ReportModal';
import { speak } from '../speech/speechUtils'; // TTS 함수 import

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
  background-image: url('/user.png');
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
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [reportContent, setReportContent] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { postId } = useParams();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/post/${postId}`);
        setPost(response.data);
        
        const commentsResponse = await axios.get(`http://localhost:4000/api/post/${postId}/comment`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('게시글을 불러오는 데 실패했습니다.', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') return;

    const newComment = {
      postId: postId, 
      userId: userId, 
      content: comment.trim(),
    };

    try {
      const response = await axios.post('http://localhost:4000/api/post/comment', newComment);
      console.log('댓글이 작성되었습니다:', response.data);
      setComments([...comments, newComment ]); // 새로운 댓글을 기존 댓글 목록에 추가
      setComment(''); // 댓글 입력 창 비우기
    } catch (error) {
      console.error('댓글을 등록하는 데 실패했습니다:', error);
      // 실패한 경우에 대한 처리 작업을 추가할 수 있습니다.
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleReportChange = (e) => {
    setReportContent(e.target.value);
  };

  const handleReportSubmit = async () => {
    if (reportContent.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:4000/api/post/report', {
        postId,
        reportContent: reportContent.trim(),
      });
      console.log('신고가 접수되었습니다:', response.data);
      setReportContent(''); // 신고 입력 창 비우기
      setIsReportModalOpen(false); // 모달 닫기
      alert('신고가 접수되었습니다.');
    } catch (error) {
      console.error('신고를 등록하는 데 실패했습니다:', error);
      alert('신고를 등록하는 데 실패했습니다.');
    }
  };

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  useEffect(() => {
    const handleFocus = (event) => {
      const text = event.target.placeholder || event.target.textContent || '';
      speak(text, { lang: 'ko-KR' });
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.target.click();
      }
    };

    const elements = document.querySelectorAll('[tabindex]');

    elements.forEach(element => {
      element.addEventListener('focus', handleFocus);
      element.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      elements.forEach(element => {
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, []);

  // 댓글 요소에 포커스 이벤트 리스너 추가
  useEffect(() => {
    const commentsElements = document.querySelectorAll('.comment');

    const handleFocus = (event) => {
      const text = event.target.textContent || '';
      speak(text, { lang: 'ko-KR' });
    };

    commentsElements.forEach((comment) => {
      comment.addEventListener('focus', handleFocus);
    });

    return () => {
      commentsElements.forEach((comment) => {
        comment.removeEventListener('focus', handleFocus);
      });
    };
  }, [comments]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <Option />
      <MainContainer>
        <LeftSubContainer>
          <ImageSection imageUrl="https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826" />
          <DetailContainer>
            <TitleContainer>
              <h1 tabIndex="0">{post.title}</h1>
            </TitleContainer>
            <InfoContainer>
              <ProfileImage/>
              <div>
                <p>{post.nickname}</p>
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </InfoContainer>
            <ContentContainer tabIndex="0">
              <p>{post.content}</p>
            </ContentContainer>
            <CommentSection>
              <h2>댓글</h2>
              {comments.map((comment, index) => (
                <div key={index} className="comment" tabIndex="0">
                  <p><strong>{comment.nickname} : </strong> {comment.content}</p>
                </div>
              ))}
              <CommentInput 
                type="text" 
                placeholder="댓글을 입력하세요" 
                value={comment}
                onChange={handleCommentChange}
                tabIndex="0"
              />
              <CommentButton onClick={handleCommentSubmit} tabIndex="0">등록</CommentButton>
            </CommentSection>
          </DetailContainer>
          <ButtonContainer>
            <Button tabIndex="0">목록</Button>
            <Button onClick={handleEdit} tabIndex="0">수정</Button>
            <Button onClick={openReportModal} tabIndex="0">신고</Button>
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

      <ReportModal
        isOpen={isReportModalOpen}
        onRequestClose={closeReportModal}
        reportContent={reportContent}
        handleReportChange={handleReportChange}
        handleReportSubmit={handleReportSubmit}
      />
    </>
  );
};

export default PostDetail;
