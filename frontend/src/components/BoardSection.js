import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { speak } from '../speech/speechUtils'; // tts, 음성 출력을 위한 함수 import

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
  justify-content: space-between;
  width: 100%;
`;

const DropdownMenu = styled.select`
  font-size: 16px;
  padding: 8px 12px;
  position: relative;
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
  margin-bottom: 0px;
`;

const TableHeaderItem = styled.div`
  flex: ${({ isTitle }) => (isTitle ? 2 : 1)};
  text-align: left;
  font-weight: bold;
  padding-left: 50px;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const TableRowItem = styled.div`
  flex: ${({ isTitle }) => (isTitle ? 2 : 1)};
  text-align: left;
  padding-left: 50px;
  outline: none; // 포커스 시 외곽선이 표시되지 않도록 설정
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:visited {
    color: black;
  }

  &:hover {
    text-decoration: underline;
  }
`;



const BoardSection = ({ title, onCategoryChange, selectcategoryNum }) => {
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const totalPages = Math.ceil(contents.length / itemsPerPage);
  const titleRef = useRef(null);

  useEffect(() => {
    const fetchContents = async () => {
      const postData = {
        categoryId: selectcategoryNum,
        limit: 20
      };

      try {
        const response = await axios.get('http://localhost:4000/api/post/', { params: postData });
        setContents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('게시글을 가져올 수 없습니다.', error);
      }
    };

    fetchContents();
  }, [title, selectcategoryNum, currentPage]);

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderContents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    const handleFocus = (event) => {
      speak(event.target.innerText, { lang: 'ko-KR' });
    };

    return contents.slice(startIndex, endIndex).map((content) => (
      <StyledLink key={content.postId} to={`/post/${content.postId}`}> {/* Link를 사용하여 게시물 상세 페이지로 이동 */}
        <TableRow>
          <TableRowItem onFocus={handleFocus} isTitle>{content.categoryName}</TableRowItem>
          <TableRowItem tabIndex="0" onFocus={handleFocus} isTitle>{content.title}</TableRowItem>
          <TableRowItem onFocus={handleFocus}>{content.nickname}</TableRowItem>
          <TableRowItem onFocus={handleFocus}>{formatDate(content.createdAt)}</TableRowItem>
        </TableRow>
      </StyledLink>
    ));
  };

  useEffect(() => {
    const handleFocus = (event) => {
      speak(event.target.innerText, { lang: 'ko-KR' });
    };

    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.addEventListener('focus', handleFocus);
    }

    return () => {
      if (titleElement) {
        titleElement.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  return (
    <BoardContainer>
      <BoardTitleWrapper>
        <BoardTitle ref={titleRef}>{title}</BoardTitle>
        <DropdownMenu value={selectcategoryNum} onChange={handleCategoryChange}>
          <option value='0'>전체게시판</option>
          <option value='1'>자유게시판</option>
          <option value='2'>공지사항</option>
          <option value='3'>정부 혜택</option>
          <option value='4'>정보게시판</option>
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
