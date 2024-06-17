// CommentReportModal.js
import React, {useState} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

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

const Button = styled.button`
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

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TextArea = styled.textarea`
  width: calc(100% - 20px);
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const CommentReportModal = ({ isOpen, onRequestClose, commentId, postId }) => {
    const [reportContent, setReportContent] = useState('');

    const handleReportChange = (e) => {
        setReportContent(e.target.value);
      };

  const reportComment = async () => {
    if (reportContent.trim() === '') return;
    
    try {
      const response = await axios.post(`http://localhost:4000/api/post/${postId}/comment/report`, {
        commentId,
        reportContent: reportContent.trim(),
      });
      console.log('댓글이 신고되었습니다:', response.data);
      setReportContent('');
      alert('댓글이 신고되었습니다.');
      onRequestClose();
    } catch (error) {
      console.error('댓글을 신고하는 데 실패했습니다:', error);
    }
  };

  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose} 
        style={customStyles}
        ariaHideApp={false}>
      <h2>신고 내용</h2>
      <TextArea
        value={reportContent}
        onChange={handleReportChange}
        placeholder="신고 내용을 입력하세요"
      />
      <ModalButtonContainer>
        <Button onClick={reportComment}>신고</Button>
        <Button onClick={onRequestClose}>닫기</Button>
        </ModalButtonContainer>
    </Modal>
  );
};

export default CommentReportModal;
