import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import ToggleSwitch from './ToggleSwitch';
import { speak } from '../speech/speechUtils';

const NotificationIcon = styled.img`
  position: absolute;
  width: 50px;
  top: 50%;
  transform: translateY(-50%);
  right: 140px;
  margin: 0;
  cursor: pointer;
`;

const NotificationOptionIcon = styled.img`
  position: absolute;
  width: 50px;
  top: 50%;
  transform: translateY(-50%);
  right: 60px;
  margin: 0;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
  margin-bottom: 10px;
`;

const ModalHeaderItem = styled.div`
  flex: ${({ isSection }) => (isSection ? 2 : 1)};
  text-align: left;
  font-weight: bold;
  padding-left: 50px;
`;

const OptionHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
  margin-bottom: 10px;
`;

const OptionHeaderItem = styled.div`
  text-align: center;
  font-weight: bold;
`;

const OptionContainer = styled.div`
  display: flex;
  text-align: center;
  font-weight: bold;
  margin-top: ${({ isFirst }) => (isFirst ? "100px" : "50px")};
`;

const OptionItem = styled.div`
  flex: 0.7;
  text-align: center;
  font-weight: bold;
`;

const ExitButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 45%;
  text-align: center;
  font-size: 11pt;
  font-weight: 550;
  width: 60px;
  height: 40px;
  background-color: white;
  cursor: pointer;
  border: 1.5px solid #BDBDBD;
  margin: 20px auto 0;
  display: block;
`;

function Notification() {
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [Notification_1, setNotification_1] = useState(false);
  const [Notification_2, setNotification_2] = useState(false);
  const [Notification_3, setNotification_3] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    speak('알림 창이 열렸습니다', { lang: 'ko-KR' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    speak('알림 창이 닫혔습니다', { lang: 'ko-KR' });
  };

  const handleOpenOption = () => {
    setShowOption(true);
    speak('옵션 창이 열렸습니다', { lang: 'ko-KR' });
  };

  const handleCloseOption = () => {
    setShowOption(false);
    speak('옵션 창이 닫혔습니다', { lang: 'ko-KR' });
  };

  const handleToggleNotification_1 = () => {
    setNotification_1(prevState => {
      speak(prevState ? '새 게시글 알림 꺼짐' : '새 게시글 알림 켜짐', { lang: 'ko-KR' });
      return !prevState;
    });
  };

  const handleToggleNotification_2 = () => {
    setNotification_2(prevState => {
      speak(prevState ? '댓글 알림 꺼짐' : '댓글 알림 켜짐', { lang: 'ko-KR' });
      return !prevState;
    });
  };

  const handleToggleNotification_3 = () => {
    setNotification_3(prevState => {
      speak(prevState ? '메시지 알림 꺼짐' : '메시지 알림 켜짐', { lang: 'ko-KR' });
      return !prevState;
    });
  };

  const handleKeyDownToggleSwitch = (event, toggleFunction) => {
    if (event.key === 'Enter') {
      toggleFunction();
    }
  };

  return (
    <div>
      <NotificationIcon
        onClick={handleOpenModal}
        src="https://cdn.icon-icons.com/icons2/1993/PNG/512/alarm_alert_attention_bell_clock_notification_ring_icon_123203.png"
        tabIndex="0"
        alt="알림"
        onFocus={() => speak("알림", { lang: 'ko-KR' })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleOpenModal();
          }
        }}
      />
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '800px',
          },
        }}
      >
        <ModalHeader>
          <ModalHeaderItem>알림번호</ModalHeaderItem>
          <ModalHeaderItem>아이디</ModalHeaderItem>
          <ModalHeaderItem isSection>내용</ModalHeaderItem>
        </ModalHeader>
        <ExitButton onClick={handleCloseModal}>닫기</ExitButton>
      </Modal>

      <NotificationOptionIcon
        onClick={handleOpenOption}
        src="https://cdn.icon-icons.com/icons2/3106/PNG/512/gear_settings_options_icon_191642.png"
        tabIndex="0"
        alt="옵션"
        onFocus={() => speak("옵션", { lang: 'ko-KR' })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleOpenOption();
          }
        }}
      />
      <Modal
        isOpen={showOption}
        onRequestClose={handleCloseOption}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
          },
        }}
      >
       <OptionHeader>
          <OptionHeaderItem>옵션</OptionHeaderItem>
        </OptionHeader>
        <OptionContainer isFirst>
          <OptionItem
            tabIndex="0"
            onFocus={() => speak('새 게시글 알림', { lang: 'ko-KR' })}
          >
            새 게시글 알림
          </OptionItem>
          <ToggleSwitch 
            checked={Notification_1} 
            onChange={handleToggleNotification_1} 
            tabIndex="0" 
          />
        </OptionContainer>
        <OptionContainer>
          <OptionItem
            tabIndex="0"
            onFocus={() => speak('댓글 알림', { lang: 'ko-KR' })}
          >
            댓글 알림
          </OptionItem>
          <ToggleSwitch 
            checked={Notification_2} 
            onChange={handleToggleNotification_2} 
            tabIndex="0" 
          />
        </OptionContainer>
        <OptionContainer>
          <OptionItem
            tabIndex="0"
            onFocus={() => speak('메시지 알림', { lang: 'ko-KR' })}
          >
            메시지 알림
          </OptionItem>
          <ToggleSwitch 
            checked={Notification_3} 
            onChange={handleToggleNotification_3} 
            tabIndex="0" 
          />
        </OptionContainer>
        <ExitButton onClick={handleCloseOption}>닫기</ExitButton>
      </Modal>
    </div>
  );
}


export default Notification;
