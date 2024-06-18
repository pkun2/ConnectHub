import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { speak, cancelSpeech, setTtsEnabled } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import

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
  margin: 0 200px; /* 양쪽에 20px의 공백 추가 */
  overflow-x: auto; /* 가로로 내용이 넘칠 경우 가로 스크롤 생성 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 600px;
  margin-right: 0px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
`;

const SearchIcon = styled.img`
  position: absolute;
  width: 30px;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin: 0;
  cursor: pointer;
`;

const TTSButton = styled.div`
  margin-right: 20px;
  cursor: pointer;
  text-align: center;
  width: 125px;
  height: 40px;
  line-height: 40px;
  background: linear-gradient(to left top, #ADD8E6, white);
  font-size: 22pt;
  font-weight: bold;
  border-radius: 5px;
  &:hover {
    background: linear-gradient(to left top, #ADD8E6, skyblue);
  }
`;

const Option = () => {
  const [ttsEnabled, setTtsEnabledState] = useState(false);
  const searchInputRef = useRef(null);

  const handleTTSOn = () => {
    setTtsEnabledState(true);
    setTtsEnabled(true);
    speak('TTS가 켜졌습니다.', { lang: 'ko-KR' });
  };

  const handleTTSOff = () => {
    setTtsEnabledState(false);
    setTtsEnabled(false);
    cancelSpeech();
    // TTS Off 상태에서는 음성을 출력하지 않도록 speak 호출을 생략합니다.
  };

  useEffect(() => {
    const searchInput = searchInputRef.current;

    const handleFocus = (event) => {
      if (ttsEnabled) {
        const text = event.target.placeholder || event.target.value || '검색어 입력';
        speak(text, { lang: 'ko-KR' });
      }
    };

    if (searchInput) {
      searchInput.addEventListener('focus', handleFocus);
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener('focus', handleFocus);
      }
    };
  }, [ttsEnabled]);

  return (
    <OptionContainer>
      <div /> <div />
      <SearchWrapper>
        <SearchInput
          ref={searchInputRef}
          type="text"
          placeholder="검색어 입력"
          tabIndex="0"
        />
        <SearchIcon
          src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
          alt="Search Icon"
        />
      </SearchWrapper>
      <div /> <div /> <div />
      <TTSButton onClick={handleTTSOn} tabIndex="0">TTS On</TTSButton>
      <TTSButton onClick={handleTTSOff} tabIndex="0">TTS Off</TTSButton>
    </OptionContainer>
  );
}

export default Option;
