import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import Foot from './Foot';
import axios from 'axios';

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

const MyPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [nickname, setNickname] = useState('')

  const handleNicknameChange = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/changeNickname', {
        userId: localStorage.getItem("userId"),
        currentPassword,
        newNickname: nickname
      });
      console.log(response.data);
      alert('닉네임 변경 되었습니다.');
    } catch (error) {
      console.error('닉네임 변경 오류:', error);
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/changePassword', {
        userId: localStorage.getItem("userId"),
        currentPassword,
        newPassword: newPassword
      });
      alert(response.data);
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

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
            />
                      </ChangeRContainer>
        </ChangeContainer>

        <ChangeContainer password>
          <ChangeL>비밀번호 변경</ChangeL>
          <ChangeRContainer>
            <ChangeR
              end
              type="password"
              placeholder="변경할 비밀번호 입력"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </ChangeRContainer>
        </ChangeContainer>
        <ChangeContainer end>
          <ChangeL> 현재 비밀번호</ChangeL>
          <ChangeRContainer>
            <ChangeR
              type="password"
              placeholder="닉네임 혹은 비밀번호 변경 시 반드시 입력"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </ChangeRContainer>
        </ChangeContainer>
        <ButtonContainer>
          <SubmitButton onClick={handleNicknameChange}> 닉네임 적용</SubmitButton>
          <SubmitButton onClick={handlePasswordChange}> 비밀번호 적용</SubmitButton>
          <ExitButton onClick={() => { setNickname(''); setCurrentPassword(''); setNewPassword(''); }}>취소</ExitButton>
        </ButtonContainer>
      </MainContainer>
    </>
  );
}

export default MyPage;
