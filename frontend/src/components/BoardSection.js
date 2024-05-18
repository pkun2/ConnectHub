import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';

const BoardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const BoardTitle = styled.h2`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-right: 800px;
`;

const BoardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // 변경된 코드: 제목과 드롭다운 사이에 공간 분배
  width: 100%;
`;

const DropdownMenu = styled.select`
  font-size: 16px;
  padding: 8px 12px;
  position: relative; // 위치를 고정하기 위해 position 사용
  top: 0;
  right: 0;
`;

const BoardContent = styled.p`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
  margin-bottom: 10px;
  margin-bottom: 0px;
`;

const TableHeaderItem = styled.div`
  flex: ${({ isTitle }) => (isTitle ? 2 : 1)};
  text-align: left;
  font-weight: bold;
  padding-left: 50px;
`;

const EmptyBoardContent = styled.div`
  width: 100%;
  height: 50px;
  border-top: 0.5px solid #ccc;
  margin-bottom: 0px;
`;

const BoardSection = ({ title, contents, onCategoryChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const totalPages = Math.ceil(contents.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [title]);

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderContents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const getCategoryDescription = () => {
      switch (title) {
        case '전체게시판':
          return '전체게시판입니다.';
        case '자유게시판':
          return '자유게시판입니다.';
        case '공지사항':
          return '공지사항입니다.';
        case '정부 혜택':
          return '정부 혜택입니다.';
        case '정보게시판':
          return '정보게시판입니다.';
        default:
          return '';
      }
    };
    return contents.slice(startIndex, endIndex).map((content) => (
      <EmptyBoardContent key={content.id}>
        {getCategoryDescription()}
      </EmptyBoardContent>
    ));
  };

  return (
    <BoardContainer>
      <BoardTitleWrapper>
        <BoardTitle>{title}</BoardTitle>
        <DropdownMenu value={title} onChange={handleCategoryChange}>
          <option value="전체게시판">전체게시판</option>
          <option value="자유게시판">자유게시판</option>
          <option value="공지사항">공지사항</option>
          <option value="정부 혜택">정부 혜택</option>
          <option value="정보게시판">정보게시판</option>
        </DropdownMenu>
      </BoardTitleWrapper>

      <BoardContent>
        <TableHeader>
          <TableHeaderItem isTitle>게시판</TableHeaderItem>
          <TableHeaderItem isTitle>제목</TableHeaderItem>
          <TableHeaderItem>작성자</TableHeaderItem>
          <TableHeaderItem>작성일자</TableHeaderItem>
        </TableHeader>
        {renderContents()}
      </BoardContent>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </BoardContainer>
  );
};

export default BoardSection;
