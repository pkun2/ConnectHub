import React from 'react';
import styled from 'styled-components';

// 옵션바
const OptionContainer = styled.div`
  position: relative;
  top: 0px;
  margin: 0px;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  opacity : 80%;
  z-index: 900;
  margin: 0 200px; /* 양쪽에 20px의 공백 추가 */
  overflow-x: auto; /* 가로로 내용이 넘칠 경우 가로 스크롤 생성 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
`;


// 검색창
const SearchWrapper = styled.div`
  position: relative;
  width: 600px;
  margin-right: 0px;
`;

// 작성란
const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
`;

// 검색아이콘
const SearchIcon = styled.img`
  position: absolute;
  width: 30px;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin: 0;
  cursor: pointer;
`;


// TTS on 버튼
const TTSOn = styled.div`
    margin-right: 20px;
    cursor: pointer;
    text-align: center;
    width: 125px;
    height: 40px;
    line-height: 40px;
    background : linear-gradient(to left top, #ADD8E6, white);
    font-size: 22pt;
    font-weight : bold;
    border-radius: 5px;
    &:hover {
        background : linear-gradient(to left top, #ADD8E6, skyblue);
      }
`;

// TTS off 버튼
const TTSOff = styled.div`
    cursor: pointer;
    text-align: center;
    width: 125px;
    height: 40px;
    line-height: 40px;
    background : linear-gradient(to left top, #ADD8E6, white);
    font-size: 22pt;
    font-weight : bold;
    border-radius: 5px;
    &:hover {
        background : linear-gradient(to left top, #ADD8E6, skyblue);
      }
`;

const Option = () => {

  return (
    <OptionContainer>
      <div/> <div/> 
      <SearchWrapper>
        <SearchInput type="text" placeholder="검색어 입력" />
        <SearchIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt="Search Icon" />
      </SearchWrapper>
      <div/> <div/> <div/>
      <TTSOn> TTS On </TTSOn>
      <TTSOff> TTS Off </TTSOff>
    </OptionContainer>
  );
}

export default Option;