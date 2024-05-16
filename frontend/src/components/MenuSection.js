import React from 'react';
import styled from 'styled-components';
import SectionTitle from './SectionTitle';

const MenuSelectContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SectionTitle = styled.div`
  color: #426B1F;
  background : linear-gradient(to left top, #ADD8E6, white);
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
  border-bottom: 2px double #E4E4E4;
  background: initial;
  cursor: pointer;
  &:hover {
    background : linear-gradient(to left top, #ADD8E6, white);
  }
`;

const MenuSection = () => (
  <MenuSelectContainer> 
    <SectionTitle> 카테고리 </SectionTitle>
    <MenuSelect> &nbsp;&nbsp;자유게시판 </MenuSelect>
    <MenuSelect> &nbsp;&nbsp;공지사항 </MenuSelect>
    <MenuSelect> &nbsp;&nbsp;정부 혜택 </MenuSelect>
    <MenuSelect> &nbsp;&nbsp;정보 </MenuSelect>
  </MenuSelectContainer>
);

export default MenuSection;
