import React from 'react';
import styled from 'styled-components';
import CurrentTime from './CurrentTime';

// 옵션바
const OptionContainer = styled.div`
  position: sticky;
  top: 170px;
  margin: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  opacity : 80%;
  z-index: 1000;
`;


// 검색창
const SearchWrapper = styled.div`
  position: relative;
  width: 500px;
  margin-right: 50px;
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
  width: 20px;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin: 0;
`;


// TTS on 버튼
const TTSOn = styled.div`
    margin-right: 20px;
    cursor: pointer;
    text-align: center;
    width: 250px;
    height: 80px;
    line-height: 80px;
    background-color: #ADD8E6;
    border-radius: 10px;
    font-size: 22pt;
    font-weight : bold;
    box-shadow: 0 3px 15px gray;
    &:hover {
        box-shadow: 0 0 10px #44C2FF;
      }
`;

// TTS off 버튼
const TTSOff = styled.div`
    cursor: pointer;
    text-align: center;
    width: 250px;
    height: 80px;
    line-height: 80px;
    background-color: #ADD8E6;
    border-radius: 10px;
    font-size: 22pt;
    font-weight : bold;
    box-shadow: 0 3px 15px gray;
    &:hover {
        box-shadow: 0 0 10px #44C2FF;
      }
`;

const Option = () => {
  
  return (
    <OptionContainer>
      <CurrentTime/>
      <div/> <div/> <div/> <div/> <div/>
      <SearchWrapper>
          <SearchInput type="text" placeholder="검색어 입력" />
          <SearchIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt="Search Icon" />
      </SearchWrapper>
      <TTSOn> TTS On </TTSOn>
      <TTSOff> TTS Off </TTSOff>
    </OptionContainer>
  );
}

export default Option;
