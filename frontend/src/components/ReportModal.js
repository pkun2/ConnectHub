import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import { speak } from '../speech/speechUtils';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '80%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    border: 'none',
  },
};

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const ModalTextarea = styled.textarea`
  width: calc(100% - 20px);
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 1em;
  cursor: pointer;
  background-color: #add8e6;
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ReportModal = ({ isOpen, onRequestClose, postId }) => {
  const [reportContent, setReportContent] = useState('');

  const handleReportChange = (e) => {
    setReportContent(e.target.value);
  };

  const handleReportSubmit = async () => {
    if (reportContent.trim() === '') {
      speak('신고 내용을 입력해주세요.', { lang: 'ko-KR' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/post/report', {
        postId,
        reportContent: reportContent.trim(),
      });
      speak('신고가 접수되었습니다.', { lang: 'ko-KR' });
      console.log('신고가 접수되었습니다:', response.data);
      setReportContent(''); // 신고 입력 창 비우기
      setTimeout(() => {
        onRequestClose(); // 모달 닫기
      }, 2000); // 2초 지연 (TTS 발화 시간 고려)
    } catch (error) {
      console.error('신고를 등록하는 데 실패했습니다:', error);
      speak('신고를 등록하는 데 실패했습니다.', { lang: 'ko-KR' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      speak('신고 창이 열렸습니다.', { lang: 'ko-KR' });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Report Modal"
    >
      <ModalTitle tabIndex="0" onFocus={() => speak('신고 내용', { lang: 'ko-KR' })}>
        신고 내용
      </ModalTitle>
      <ModalTextarea
        placeholder="신고 내용을 입력하세요"
        value={reportContent}
        onChange={handleReportChange}
        tabIndex="0"
        onFocus={() => speak('신고 내용을 입력하세요', { lang: 'ko-KR' })}
      />
      <ModalButtonContainer>
        <ModalButton tabIndex="0" onFocus={() => speak('제출', { lang: 'ko-KR' })} onClick={handleReportSubmit}>
          제출
        </ModalButton>
        <ModalButton tabIndex="0" onFocus={() => speak('닫기', { lang: 'ko-KR' })} onClick={onRequestClose}>
          닫기
        </ModalButton>
      </ModalButtonContainer>
    </Modal>
  );
};

export default ReportModal;
