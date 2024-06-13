import React, { useEffect } from 'react';
import styled from 'styled-components';
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import

const MenuSelectContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SectionTitle = styled.div`
  color: #426b1f;
  background: linear-gradient(to left top, #add8e6, white);
  font-size: 25pt;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
  width: inherit;
`;

const MenuSelect = styled(SectionTitle)`
  text-align: left;
  font-size: 16pt;
  font-weight: bolder;
  text-decoration: none;
  padding: 13px 0;
  width: inherit;
  border-bottom: 2px double #e4e4e4;
  background: initial;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to left top, #add8e6, white);
  }
`;

const MenuSection = ({ onCategoryChange, selectedCategory }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  // tts, 음성 출력 및 탭으로 포커싱 및 엔터 키로 작동 설정
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


  return (
    <MenuSelectContainer>
      <SectionTitle tabIndex="0">카테고리</SectionTitle>
      <MenuSelect
        tabIndex="0"
        onClick={() => handleCategoryClick('전체게시판')}
        style={{ background: selectedCategory === '전체게시판' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;전체게시판
      </MenuSelect>
      <MenuSelect
        tabIndex="0"
        onClick={() => handleCategoryClick('자유게시판')}
        style={{ background: selectedCategory === '자유게시판' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;자유게시판
      </MenuSelect>
      <MenuSelect
        tabIndex="0"
        onClick={() => handleCategoryClick('공지사항')}
        style={{ background: selectedCategory === '공지사항' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;공지사항
      </MenuSelect>
      <MenuSelect
        tabIndex="0"
        onClick={() => handleCategoryClick('정부 혜택')}
        style={{ background: selectedCategory === '정부 혜택' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;정부 혜택
      </MenuSelect>
      <MenuSelect
        tabIndex="0"
        onClick={() => handleCategoryClick('정보게시판')}
        style={{ background: selectedCategory === '정보게시판' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;정보게시판
      </MenuSelect>
    </MenuSelectContainer>
  );
};

export default MenuSection;
