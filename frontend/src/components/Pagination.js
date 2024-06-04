import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0px;
  width: 100%;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationWrapper>
      <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </PageButton>
      {pageNumbers.map(number => (
        <PageButton key={number} onClick={() => onPageChange(number)} disabled={currentPage === number}>
          {number}
        </PageButton>
      ))}
      <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        다음
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
