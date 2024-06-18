import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import Foot from './Foot';
import axios from 'axios';
import { speak, cancelSpeech } from '../speech/speechUtils';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 600px; 
  padding-top: 0px;
  margin: 50px 400px 176px 400px; 
`;

const SectionTitle = styled.div`
  color: #426B1F;
  font-size: 21pt;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
`;

const SubTitle = styled.div`
  color: #949494;
  font-size: 15pt;
  text-decoration: none;
  text-align: center;
  padding-bottom: 13px;
`;

const ChangeContainer = styled.div`
  display: flex;
  flex-direction: row; 
  margin-top: ${props => (props.first ? '80px' : '0')};
  width: 700px;
  height: 100px;
  font-size: 10pt;
  border: 1.5px solid #E4E4E4;
  border-bottom: ${props => (props.end ? '1.5px solid #E4E4E4' : 'none')}
`;

const ChangeL = styled.div`
  flex: 0.2;
  padding: 10pt 10pt;
  font-size: 10pt;
  font-weight: 550;
  white-space: nowrap;
  background-color: rgba(212, 244, 250, 0.5);
  border-right: 1.5px solid #E4E4E4;
  width: 300px;
`;

const ChangeRContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChangeR = styled.input`
  font-size: 11pt;
  white-space: nowrap;
  border: 1.8px solid #E4E4E4;
  width: 400px;
  margin-top: ${props => (props.end ? "40px" : "35px")};
  margin-left: 70px;
  padding-left: 3pt;
`;

const ButtonContainer = styled.div`
  flex: 0.1;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  
`;

const SubmitButton = styled.button`
  text-align: center;
  font-size: 11pt;
  font-weight: 550;
  white-space: nowrap;
  margin-right: 5px;
  height: 40px;
  background-color: white;
  cursor: pointer;
  border: 1.5px solid #BDBDBD;
`;

const ExitButton = styled.button`
  text-align: center;
  font-size: 11pt;
  font-weight: 550;
  white-space: nowrap;
  height: 40px;
  background-color: white;
  cursor: pointer;
  border: 1.5px solid #BDBDBD;
`;

const VoiceButton = styled.button`
  width: 40%;
  background-color: ${(props) => props.backgroundColor || '#ADD8E6'};
  margin-left: 70px;
  margin-top: 1px;
  color: #fff;
  border: none;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background-color: ${(props) => props.hoverColor || '#7BB7D3'};
  }
`;


const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isListeningForField, setIsListeningForField] = useState('');

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleNicknameChange = async () => {
    try {
      const response = await axios.post('/api/user/changeNickname', {
        email: "yyy@naver.com",  // 실제 사용자 이메일로 변경
        currentPassword,
        newNickname: nickname
      });
      setAlertMessage(response.data);
      speak(response.data, { lang: 'ko-KR' });
    } catch (error) {
      console.error('닉네임 변경 오류:', error);
      const errorMessage = '닉네임 변경에 실패했습니다.';
      setAlertMessage(errorMessage);
      speak(errorMessage, { lang: 'ko-KR' });
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post('/api/user/changePassword', {
        email: "yyy@naver.com",  // 실제 사용자 이메일로 변경
        currentPassword,
        newPassword
      });
      setAlertMessage(response.data);
      speak(response.data, { lang: 'ko-KR' });
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      const errorMessage = '비밀번호 변경에 실패했습니다.';
      setAlertMessage(errorMessage);
      speak(errorMessage, { lang: 'ko-KR' });
    }
  };

  const startListening = (field) => {
    setIsListeningForField(field);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  useEffect(() => {
    if (!listening && transcript) {
      const updatedTranscript = transcript.trim().replace(' 골뱅이 ', '@').replace('-', '').replace('더하기 ', '+');

      if (isListeningForField) {
        switch (isListeningForField) {
          case 'nickname':
            setNickname(updatedTranscript);
            speak('닉네임이 입력되었습니다.', { lang: 'ko-KR' });
            break;
          case 'currentPassword':
            setCurrentPassword(updatedTranscript);
            speak('현재 비밀번호가 입력되었습니다.', { lang: 'ko-KR' });
            break;
          case 'newPassword':
            setNewPassword(updatedTranscript);
            speak('새 비밀번호가 입력되었습니다.', { lang: 'ko-KR' });
            break;
          default:
            break;
        }
        setIsListeningForField('');
      }
    }
  }, [listening, transcript, isListeningForField]);

  useEffect(() => {
    const tabs = document.querySelectorAll('[tabindex]');
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
    tabs.forEach(tab => {
      tab.addEventListener('focus', handleFocus);
      tab.addEventListener('keydown', handleKeyDown);
    });
    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('focus', handleFocus);
        tab.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    console.error("브라우저가 음성 인식을 지원하지 않습니다.");
    return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
  }

  return (
    <>
      <Navigation />
      <Option />
      <MainContainer>
        <SectionTitle>마이페이지</SectionTitle>
        <SubTitle>개인정보를 수정할 수 있습니다</SubTitle>
        <ChangeContainer first>
          <ChangeL>닉네임</ChangeL>
          <ChangeRContainer>
            <ChangeR
              type="text"
              placeholder="변경할 닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              tabIndex="0"
            />
            <VoiceButton type="button" onClick={() => startListening('nickname')} tabIndex="0">음성으로 닉네임 입력</VoiceButton>
          </ChangeRContainer>
        </ChangeContainer>
        <ChangeContainer>
          <ChangeL>비밀번호 변경</ChangeL>
          <ChangeRContainer>
            <ChangeR
              type="password"
              placeholder="변경할 비밀번호 입력"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              tabIndex="0"
            />
            <VoiceButton type="button" onClick={() => startListening('newPassword')} tabIndex="0">음성으로 새 비밀번호 입력</VoiceButton>
          </ChangeRContainer>
        </ChangeContainer>
        <ChangeContainer end>
          <ChangeL>현재 비밀번호</ChangeL>
          <ChangeRContainer>
            <ChangeR
              type="password"
              placeholder="닉네임 혹은 비밀번호 변경 시 반드시 입력"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              tabIndex="0"
            />
            <VoiceButton type="button" onClick={() => startListening('currentPassword')} tabIndex="0">음성으로 현재 비밀번호 입력</VoiceButton>
          </ChangeRContainer>
        </ChangeContainer>
        <ButtonContainer>
          <SubmitButton onClick={handleNicknameChange} tabIndex="0">닉네임 적용</SubmitButton>
          <SubmitButton onClick={handlePasswordChange} tabIndex="0">비밀번호 적용</SubmitButton>
          <ExitButton onClick={() => { setNickname(''); setCurrentPassword(''); setNewPassword(''); }} tabIndex="0">취소</ExitButton>
        </ButtonContainer>
      </MainContainer>
    </>
  );
}

export default MyPage;
