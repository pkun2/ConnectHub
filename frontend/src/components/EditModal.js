// EditModal.js

import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
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

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const ModalInput = styled.input`
  width: calc(100% - 20px);
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
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

const EditModal = ({ isOpen, onRequestClose, postId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/post/update/${postId}`, {
        title: title,
        content: content,
        postId: postId,
      });
      console.log('게시글이 성공적으로 수정되었습니다:', response.data);
      alert('게시글이 성공적으로 수정되었습니다.');
      window.location.reload();
      onRequestClose(); // 모달 닫기
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="수정 모달"
    >
      <ModalTitle>게시글 수정</ModalTitle>
      <ModalInput
        type="text"
        placeholder="제목"
        value={title}
        onChange={handleTitleChange}
      />
      <ModalTextarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={handleContentChange}
      />
      <ModalButtonContainer>
        <Button onClick={handleEditSubmit}>수정 </Button>
        <Button onClick={onRequestClose}>닫기 </Button>
      </ModalButtonContainer>
    </Modal>
  );
};

export default EditModal;
