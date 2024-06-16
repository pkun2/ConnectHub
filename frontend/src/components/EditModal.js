// EditModal.js

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
      speak('제목과 내용을 모두 입력해주세요.', { lang: 'ko-KR' });
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/api/post/update/${postId}`, {
        title: title,
        content: content,
        postId: postId,
      });
      speak('게시글이 성공적으로 수정되었습니다.', { lang: 'ko-KR' });
      console.log('게시글이 성공적으로 수정되었습니다:', response.data);
  
      // TTS 발화 후 페이지 새로 고침
      setTimeout(() => {
        window.location.reload();
        onRequestClose(); // 모달 닫기
      }, 3000); // 1초 지연 (TTS 발화 시간 고려)
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      speak('게시글 수정 중 오류가 발생했습니다.', { lang: 'ko-KR' });
    }
  };
  

  useEffect(() => {
    if (isOpen) {
      speak('게시글 수정 창이 열렸습니다.', { lang: 'ko-KR' });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Edit Modal"
    >
      <ModalTitle tabIndex="0" onFocus={() => speak('게시글 수정', { lang: 'ko-KR' })}>
        게시글 수정
      </ModalTitle>
      <ModalInput
        type="text"
        placeholder="제목"
        value={title}
        onChange={handleTitleChange}
        tabIndex="0"
        onFocus={() => speak('제목', { lang: 'ko-KR' })}
      />
      <ModalTextarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={handleContentChange}
        tabIndex="0"
        onFocus={() => speak('내용을 입력하세요', { lang: 'ko-KR' })}
      />
      <ModalButtonContainer>
        <ModalButton tabIndex="0" onFocus={() => speak('수정', { lang: 'ko-KR' })} onClick={handleEditSubmit}>
          수정
        </ModalButton>
        <ModalButton tabIndex="0" onFocus={() => speak('닫기', { lang: 'ko-KR' })} onClick={onRequestClose}>
          닫기
        </ModalButton>
      </ModalButtonContainer>
    </Modal>
  );
};

export default EditModal;
