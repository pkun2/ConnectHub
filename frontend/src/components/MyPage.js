import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import Foot from './Foot';

// 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 600px; 
  padding-top: 0px;
  margin: 50px 400px 176px 400px; 
`;

// 내용 컨테이너
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.8px solid #E4E4E4; 
  margin: 0 200px 100px 200px;
  height: 500px;
  width: 600px; 
`;

// 제목
const SectionTitle = styled.div`
  color: #426B1F;
  font-size: 21pt;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
`;

// 부제
const SubTitle = styled.div`
  color: #949494;
  font-size: 15pt;
  text-decoration: none;
  text-align: center;
  padding-bottom: 13px;
`;

// 변경 컨테이너
const ChangeContainer = styled.div`
  display: flex;
  flex-direction: row; 
  margin-top: ${props => (props.first ? '80px' : '0')};
  width: 700px;
  height: ${props => (props.password ? '180px' : '100px')};;
  font-size: 10pt;
  border: 1.5px solid #E4E4E4;
  border-bottom: ${props => (props.end ? '1.5px solid #E4E4E4' : 'none')}
`;

// 변경(Left)
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

// 변경(Right)컨테이너
const ChangeRContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 변경(Right)
const ChangeR = styled.input`
  font-size: 11pt;
  white-space: nowrap;
  border: 1.8px solid #E4E4E4;
  width: 400px;
  margin-top: ${props => (props.end ? "40px" : "35px")};
  margin-left: 70px;
  padding-left: 3pt;
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  flex: 0.1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
  width: 200px;
`;

// 적용 버튼
const SubmitButton = styled.button`
  text-align: center;
  font-size: 11pt;
  font-weight: 550;
  width: 60px;
  height: 40px;
  background-color: white;
  cursor: pointer;
  border: 1.5px solid #BDBDBD;
`;

// 취소 버튼
const ExitButton = styled.button`
  text-align: center;
  font-size: 11pt;
  font-weight: 550;
  width: 60px;
  height: 40px;
  background-color: white;
  cursor: pointer;
  border: 1.5px solid #BDBDBD;
`;

const MyPage = () => {

    return (
      <>
        <Navigation/>
        <Option/>
        <MainContainer>
            <SectionTitle> 마이페이지 </SectionTitle>
            <SubTitle> 개인정보를 수정할 수 있습니다 </SubTitle>
            <ChangeContainer first>
                <ChangeL> 닉네임 </ChangeL>
                <ChangeRContainer> 
                    <ChangeR type="text" placeholder="변경할 닉네임 입력"/>
                </ChangeRContainer>
            </ChangeContainer>

            <ChangeContainer>
                <ChangeL> 아이디 변경 </ChangeL>
                <ChangeRContainer> 
                    <ChangeR type="text" placeholder="변경할 아이디 입력"/>
                </ChangeRContainer>
            </ChangeContainer>

            <ChangeContainer end password>
                <ChangeL> 비밀번호 변경 </ChangeL>
                <ChangeRContainer> 
                    <ChangeR end type="text" placeholder="현재 비밀번호 입력"/>
                    <ChangeR end type="text" placeholder="변경할 비밀번호 입력"/>
                </ChangeRContainer>
            </ChangeContainer>
            <ButtonContainer>
              <SubmitButton> 적용 </SubmitButton>
              <ExitButton> 취소 </ExitButton>
            </ButtonContainer>
        </MainContainer>
        <Foot/>
      </>
    );
  }
  
  export default MyPage;