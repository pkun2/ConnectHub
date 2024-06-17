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
import EditModal from './EditModal';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // STT 사용을 위한 import

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
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { postId } = useParams();
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

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
      setComments([...comments, newComment]); // 새로운 댓글을 기존 댓글 목록에 추가
      setComment(''); // 댓글 입력 창 비우기
    } catch (error) {
      console.error('댓글을 등록하는 데 실패했습니다:', error);
      // 실패한 경우에 대한 처리 작업을 추가할 수 있습니다.
    }
  };
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleGoMain = () => {
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditModalOpen(true); // 수정 모달 열기
  };

  const handleReport = () => {
    setIsReportModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/post/`, {
        data: { userId: userId, postId: postId }
      });
      console.log('게시글이 삭제되었습니다:', response.data);
      speak('게시글이 삭제되었습니다.', { lang: 'ko-KR' });
      navigate('/');
    } catch (error) {
      console.error('게시글을 삭제하는 데 실패했습니다:', error);
      speak('게시글을 삭제하는 데 실패했습니다.', { lang: 'ko-KR' });
      // 실패한 경우에 대한 처리 작업을 추가할 수 있습니다.
    }
  };

  const handleVoiceCommentInput = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  useEffect(() => {
    if (!listening) {
      if (transcript) {
        setComment(transcript);
        speak('댓글이 입력되었습니다.', { lang: 'ko-KR' });
      }
    }
  }, [listening, transcript]);

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
          <ImageSection />
          <DetailContainer>
            <TitleContainer>
              <h1 tabIndex="0">{post.title}</h1>
            </TitleContainer>
            <InfoContainer>
              <ProfileImage src={`${process.env.PUBLIC_URL}/user.png`} alt="Profile"/>
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
              <Button type="button" tabIndex="0" onClick={handleVoiceCommentInput}>음성으로 댓글 입력</Button>
              <CommentButton onClick={handleCommentSubmit} tabIndex="0">등록</CommentButton>
            </CommentSection>
          </DetailContainer>
          <ButtonContainer>
            <Button onClick={handleGoMain} tabIndex="0">목록</Button>
            <Button onClick={handleEdit} tabIndex="0">수정</Button>
            <Button onClick={handleReport} tabIndex="0">신고</Button>
            <Button onClick={handleDelete} tabIndex="0">삭제</Button>
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
        onRequestClose={() => setIsReportModalOpen(false)}
        postId={postId}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        postId={postId}
      />
    </>
  );
};

export default PostDetail;
