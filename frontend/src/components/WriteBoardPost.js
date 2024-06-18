import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from './Navigation';
import Option from './Option';
import ImageSection from './ImageSection';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // stt 사용을 위한 import

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 1400px;
  padding-top: 0px;
  margin: 0 200px 100px 200px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const SubContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px;
  margin: 20px 20px;
`;

const FormContainer = styled.div`
  width: 100%;  // SubContainer의 너비를 상속받도록 수정
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;  // Form의 너비를 SubContainer에 맞춤
  max-width: 1200px;  // 원하는 최대 너비 설정 (필요에 따라 조정)
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Title = styled.h2`
  width: 100%;
  text-align: left;
  padding: 20px;
  font-size: 30px;
  border-bottom: 2px solid black; /* 하단에 검은색 외곽선 추가 */
  padding-bottom: 10px; /* 외곽선과 제목 사이의 간격을 조정 */
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 22px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 32px;
`;

const Button = styled.button`
  width: 10%;
  padding: 10px;
  margin: 10px 0;
  background-color: #ADD8E6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background-color: #45a049;
  }
`;

const SelectPicker = styled.select`
  width: 50%;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 22px;
`;

const VoiceButton = styled.button`
  width: 30%;
  padding: 10px;
  margin: 10px 0;
  background-color: #ADD8E6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #45a049;
  }
`;

const WriteBoardPost = () => {
  const { userId, nickname } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('게시판을 선택해주세요'); // 선택된 게시판 종류를 저장하는 state
  const [isListeningForTitle, setIsListeningForTitle] = useState(false); // 제목 또는 내용을 구분하기 위한 state
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
      if (!browserSupportsSpeechRecognition) {
          console.error("브라우저가 음성 인식을 지원하지 않습니다.");
          return;
      }

      const handleFocus = (event) => {
          const text = event.target.placeholder || event.target.textContent || '';
          if (event.target.tagName === 'SELECT') {
              speak('스페이스바를 눌러 게시판을 선택해주세요', { lang: 'ko-KR' });
          } else {
              speak(text, { lang: 'ko-KR' });
          }
      };

      const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
              event.preventDefault();
              event.target.click();
          }
      };

      const handleChange = (event) => {
          if (event.target.tagName === 'SELECT') {
              const selectedOption = event.target.options[event.target.selectedIndex].text;
              speak(selectedOption, { lang: 'ko-KR' });
          }
      };

      const tabs = document.querySelectorAll('[tabindex]');
      tabs.forEach(tab => {
          tab.addEventListener('focus', handleFocus);
          tab.addEventListener('keydown', handleKeyDown);
      });

      const selectElement = document.querySelector('select');
      if (selectElement) {
          selectElement.addEventListener('change', handleChange);
      }

      return () => {
          tabs.forEach(tab => {
              tab.removeEventListener('focus', handleFocus);
              tab.removeEventListener('keydown', handleKeyDown);
          });

          if (selectElement) {
              selectElement.removeEventListener('change', handleChange);
          }
      };
  }, []);

  const handleTitleChange = (e) => {
      setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
      setContent(e.target.value);
  };

  const handleBoardChange = (e) => {
      setSelectedBoard(e.target.value);
  };

  const handleVoiceTitleInput = () => {
      setIsListeningForTitle(true);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
  };

  const handleVoiceContentInput = () => {
      setIsListeningForTitle(false);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
  };

  useEffect(() => {
      if (!listening) {
          if (transcript) {
              if (isListeningForTitle) {
                  setTitle(transcript);
                  speak('제목이 입력되었습니다.', { lang: 'ko-KR' });
              } else {
                  setContent(transcript);
                  speak('내용이 입력되었습니다.', { lang: 'ko-KR' });
              }
          }
      }
  }, [listening, transcript, isListeningForTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedBoard === '' || selectedBoard === '게시판을 선택해주세요') {
        speak('게시판을 선택해주세요.', { lang: 'ko-KR' });
        return;
    }
    if (!title || !content) {
        speak('제목과 내용을 입력해주세요.', { lang: 'ko-KR' });
        return;
    }
    const postData = {
        userId: userId,
        categoryId: selectedBoard,
        title: title,
        content: content,
        nickname: nickname,
    };
    try {
        const response = await axios.post('http://localhost:4000/api/post/write', postData);
        console.log('Response:', response.data);
        speak('글 작성이 완료되었습니다.', { lang: 'ko-KR' });
        
        // 알림 생성 API 호출
        await axios.post('http://localhost:4000/api/notifications', {
          userId: userId, // 글 작성자의 userId
          message: `${nickname}님이 새로운 글을 작성했습니다.`,
          notificationType: 'post',
          sourceId: response.data.postId, // 생성된 글의 ID
        });
        console.log('알림이 생성되었습니다');
        
        navigate('/'); // 글 작성 후 Main 페이지로 이동
    } catch (error) {
        console.error('게시글을 작성할 수 없습니다.', error);
        speak('게시글 작성에 실패했습니다.', { lang: 'ko-KR' });
    }
  };
  

  return (
    <>
      <Navigation />
        <Option />
          <MainContainer>
            <SubContainer>
              <ImageSection imageUrl="https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826" />
              <FormContainer>
                <Form onSubmit={handleSubmit}>
                  <Title tabIndex="0">게시글 작성</Title>
                  <SelectPicker value={selectedBoard} onChange={handleBoardChange} tabIndex="0">
                  <option value="게시판을 선택해주세요" disabled hidden>스페이스바를 눌러 게시판을 선택해주세요</option>
                  <option value="1">자유게시판</option>
                  <option value="2">공지사항</option>
                  <option value="3">정부 혜택</option>
                  <option value="4">정보게시판</option>
                  </SelectPicker>
                  <Input 
                    type="text" 
                    placeholder="제목을 입력하세요" 
                    value={title} 
                    onChange={handleTitleChange} 
                    tabIndex="0"
                  />
                  <VoiceButton type="button" tabIndex="0" onClick={handleVoiceTitleInput}>음성으로 제목 입력</VoiceButton>
                  <TextArea 
                    placeholder="내용을 입력하세요" 
                    value={content} 
                    onChange={handleContentChange} 
                    tabIndex="0"
                  />
                  <VoiceButton type="button" tabIndex="0" onClick={handleVoiceContentInput}>음성으로 내용 입력</VoiceButton>
                  <Button type="submit" tabIndex="0">등록</Button>
                </Form>
              </FormContainer>
            </SubContainer>
          </MainContainer>
      </>
  );
};

export default WriteBoardPost;