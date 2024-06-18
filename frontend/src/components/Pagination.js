import React, { useEffect } from 'react';
import styled from 'styled-components';       
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import

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

  // tts, 음성 출력 및 탭으로 포커싱
  useEffect(() => {
    const tabs = document.querySelectorAll('[tabindex]');

    const handleFocus = (event) => {
      const text = event.target.textContent.trim();
      speak(text, { lang: 'ko-KR' });
    };

    tabs.forEach(tab => {
      tab.addEventListener('focus', handleFocus);
    });

    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('focus', handleFocus);
      });
    };
  }, []);


  return (
    <PaginationWrapper>
      <PageButton 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        tabIndex="0"
      >
        이전
      </PageButton>
      {pageNumbers.map(number => (
        <PageButton 
          key={number} 
          onClick={() => onPageChange(number)} 
          disabled={currentPage === number} 
          tabIndex="0"
        >
          {number}
        </PageButton>
      ))}
      <PageButton 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        tabIndex="0"
      >
        다음
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
