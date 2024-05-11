import React from 'react';
import styled from 'styled-components';

// 옵션바
const OptionContainer = styled.div`
  position: sticky;
  top: 170px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  opacity : 80%;
  z-index: 1000;
`;


// 검색창
const SearchWrapper = styled.div`
  position: relative;
  width: 300px;
  margin-right: 100px;
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
  width: 17px;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  margin: 0;
`;


// 원래대로
const Restore = styled.div`
    cursor: pointer;
    text-align: center;
    width: 80px;
    height: 80px;
    line-height: 80px;
    background-color: #F4E0E0;
    border-radius: 50%;
    font-weight : bold;
    box-shadow: 0 2px 15px black;
    &:hover {
        box-shadow: 0 0 10px #44C2FF;
      }
`;

// 화면 크기 조정바
const SizeControl = styled.div`
  display: flex;
  font-size: 20pt;
  flex-direction: row;
  align-items: center;
  margin-right: 100px;
  margin-left: 50px;
  font-weight: bold;
`;

// 크게 혹은 작게 조절버튼
const UporDown = styled.div`
    cursor: pointer;
    font-size: 50px;
    text-align: center;
    width: 70px;
    height: 70px;
    line-height: 59px;
    background-color: #D9D9D9;
    border-radius: 50%;
    font-weight : bold;
    box-shadow: 0 2px 15px black;
    &:hover {
        box-shadow: 0 0 10px #44C2FF;
      }
`;

const Option = () => {
  return (
    <OptionContainer>
        <SearchWrapper>
            <SearchInput type="text" placeholder="검색어 입력" />
            <SearchIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt="Search Icon" />
        </SearchWrapper>
        <Restore> 원래대로 </Restore>
        <SizeControl>
            <UporDown> - </UporDown>
            화면 크게 하기
            <UporDown> + </UporDown>
        </SizeControl>
    </OptionContainer>
  );
}

export default Option;
