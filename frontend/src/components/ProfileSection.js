import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import

const ProfileContainer = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: column;
  width: 100%;
`;

const SectionTitle = styled.div`
  color: #426B1F;
  background: linear-gradient(to left top, #ADD8E6, white);
  font-size: 25pt;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
  width: inherit;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 40px;
  width: 100%;
  justify-content: flex-start;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url('/user.png');
  background-size: cover; 
  background-position: center; 
  margin-right: 20px;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: colum;
`;

const Nickname = styled.div`
  font-size: 16pt;
  font-weight: bold;
  margin-right: 20px;
  margin-bottom: 5px;
`;

const MyPageLink = styled.button` 
  font-size: 12pt;
  color: #426B1F;
  margin-bottom: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const WriteButtonLink = styled.button`
  font-size: 12pt;
  padding: 10px 16px;
  background-color: #426B1F;
  color: white;
  border: none;
  margin: 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: #365314;
  }
`;

const LogoutButton = styled.button`
  font-size: 12pt;
  padding: 8px 12px;
  background-color: #426B1F;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #365314;
  }
`;

const ProfileSection = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToWritePage = () => {
    navigate('/write');
  };

  // tts, 음성 출력 및 탭으로 포커싱
  useEffect(() => {
    const tabs = document.querySelectorAll('[tabindex]');

    const handleFocus = (event) => {
      const text = event.target.textContent.trim();
      speak(text, { lang: 'ko-KR' });
    };

    tabs.forEach(tab => {
      tab.addEventListener('focus', handleFocus);
    });

    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('focus', handleFocus);
      });
    };
  }, []);

  return (
    <ProfileContainer>
      <SectionTitle tabIndex="0">내 정보</SectionTitle>
      <ProfileContent>
        <ProfileImage/>
        <NicknameContainer>
          <Nickname>닉네임</Nickname>
          <MyPageLink onClick={goToMyPage} tabIndex="0">마이페이지</MyPageLink>
        </NicknameContainer>
        <LogoutButton onClick={handleLogout} tabIndex="0">로그아웃</LogoutButton>
      </ProfileContent>
      <WriteButtonLink onClick={goToWritePage} tabIndex="0">글쓰기</WriteButtonLink>
    </ProfileContainer>
  );
};

export default ProfileSection;
