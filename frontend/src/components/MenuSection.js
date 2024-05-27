import React from 'react';
import styled from 'styled-components';

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

  return (
    <MenuSelectContainer>
      <SectionTitle>카테고리</SectionTitle>
      <MenuSelect
        onClick={() => handleCategoryClick('전체게시판')}
        style={{ background: selectedCategory === '전체게시판' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;전체게시판
      </MenuSelect>
      <MenuSelect
        onClick={() => handleCategoryClick('자유게시판')}
        style={{ background: selectedCategory === '자유게시판' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;자유게시판
      </MenuSelect>
      <MenuSelect
        onClick={() => handleCategoryClick('공지사항')}
        style={{ background: selectedCategory === '공지사항' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;공지사항
      </MenuSelect>
      <MenuSelect
        onClick={() => handleCategoryClick('정부 혜택')}
        style={{ background: selectedCategory === '정부 혜택' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;정부 혜택
      </MenuSelect>
      <MenuSelect
        onClick={() => handleCategoryClick('정보게시판')}
        style={{ background: selectedCategory === '정보게시판' ? 'linear-gradient(to left top, #add8e6, white)' : 'initial' }}
      >
        &nbsp;&nbsp;정보게시판
      </MenuSelect>
    </MenuSelectContainer>
  );
};

export default MenuSection;
