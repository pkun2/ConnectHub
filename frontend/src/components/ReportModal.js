// ReportModal.js

import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { speak } from '../speech/speechUtils';

const ReportInput = styled.textarea`
  width: calc(100% - 20px);
  margin-top: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 1em;
  cursor: pointer;
  background-color: #add8e6;
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#0056b3'};
  }
`;

const ReportModal = ({ isOpen, onRequestClose, reportContent, handleReportChange, handleReportSubmit }) => {
  useEffect(() => {
    if (isOpen) {
      speak('신고 창이 열렸습니다.', { lang: 'ko-KR' });
    } 
  }, [isOpen]);



return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="신고 모달"
    appElement={document.getElementById('root')}
    style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <h2 tabIndex="0" onFocus={() => speak('신고 내용', { lang: 'ko-KR' })}>신고 내용</h2>
      <ReportInput
        rows="4"
        placeholder="신고 내용을 입력하세요"
        value={reportContent}
        onChange={handleReportChange}
        tabIndex="0"
        onFocus={() => speak('신고 내용을 입력하세요', { lang: 'ko-KR' })}
      />
      <ButtonContainer>
        <Button tabIndex="0" onFocus={() => speak('제출', { lang: 'ko-KR' })} onClick={handleReportSubmit}>제출</Button>
        <Button tabIndex="0" onFocus={() => speak('닫기', { lang: 'ko-KR' })} onClick={onRequestClose}>닫기</Button>
      </ButtonContainer>
    </Modal>
  );
};

export default ReportModal;
