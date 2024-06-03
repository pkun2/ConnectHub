import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const BoardTitle = styled.h2`
  width: 100%;
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const BoardContent = styled.p`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
`;

const EmptyBoardContent = styled.div`
  width: 100%;
  height: 50px;
  border-top: 0.5px solid #ccc;
  margin-bottom: 0px;
`;

const BoardSection = ({ title, contents }) => (
  <BoardContainer>
    <BoardTitle>{title}</BoardTitle>
    <BoardContent>
      {contents.map(content => (
        <EmptyBoardContent key={content.id} />
      ))}
    </BoardContent>
  </BoardContainer>
);

export default BoardSection;
