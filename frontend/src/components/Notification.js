import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ToggleSwitch from './ToggleSwitch';
import { speak } from '../speech/speechUtils'; // TTS 기능 import

// 알림아이콘
const NotificationIcon = styled.img`
  position: absolute;
  width: 50px;
  top: 50%;
  transform: translateY(-50%);
  right: 140px;
  margin: 0;
  cursor: pointer;
`;

// 알림설정아이콘
const NotificationOptionIcon = styled.img`
  position: absolute;
  width: 50px;
  top: 50%;
  transform: translateY(-50%);
  right: 60px;
  margin: 0;
  cursor: pointer;
`;

// 전체 화면을 흐리게 만드는 오버레이
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9); /* 반투명 검정색 */
  z-index: 999; /* 모달보다 낮은 레벨 */
`;

// 알림창
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 가장 높은 레벨 */
  width: 500px;
  height: 800px;
`;

// 알림설정창
const ModalOption = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 가장 높은 레벨 */
  width: 500px;
  height: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-top: 2px solid #000;
  border-bottom: 2px solid #ccc;
  margin-bottom: 10px;
  margin-bottom: 0px;
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
  margin-bottom: 0px;
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
  position: fixed;
  left: 44.5%;
  bottom: 0;
  text-align: center;
  font-size: 11pt;
  font-weight: 550;
  width: 60px;
  height: 40px;
  background-color: white;
  cursor: pointer;
  border: 1.5px solid #BDBDBD;
`;

function Notification() {
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [Notification_1, setNotification_1] = useState(false);
  const [Notification_2, setNotification_2] = useState(false);
  const [Notification_3, setNotification_3] = useState(false);
  const notificationIconRef = useRef(null); // 알림 아이콘을 위한 ref 추가
  const notificationOptionIconRef = useRef(null); // 알림 설정 아이콘을 위한 ref 추가

  const handleOpenModal = () => {
    setShowModal(true);
    speak("알림창이 열렸습니다.", { lang: 'ko-KR' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    speak("알림창이 닫혔습니다.", { lang: 'ko-KR' });
  };

  const handleOpenOption = () => {
    setShowOption(true);
    speak("알림 설정이 열렸습니다.", { lang: 'ko-KR' });
  };

  const handleCloseOption = () => {
    setShowOption(false);
    speak("알림 설정이 닫혔습니다.", { lang: 'ko-KR' });
  };

  const handleToggleNotification_1 = () => {
    setNotification_1((prevState) => !prevState);
    speak(`새 게시글 알림이 ${!Notification_1 ? '활성화' : '비활성화'}되었습니다.`, { lang: 'ko-KR' });
  };

  const handleToggleNotification_2 = () => {
    setNotification_2((prevState) => !prevState);
    speak(`댓글 알림이 ${!Notification_2 ? '활성화' : '비활성화'}되었습니다.`, { lang: 'ko-KR' });
  };

  const handleToggleNotification_3 = () => {
    setNotification_3((prevState) => !prevState);
    speak(`메시지 알림이 ${!Notification_3 ? '활성화' : '비활성화'}되었습니다.`, { lang: 'ko-KR' });
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
            handleOpenModal();  // Enter 키로 모달 열기
          }
        }}
      />
      {showModal && (
        <>
          <ModalOverlay onClick={handleCloseModal} />
          <Modal>
            <ModalHeader>
              <ModalHeaderItem>알림번호</ModalHeaderItem>
              <ModalHeaderItem>아이디</ModalHeaderItem>
              <ModalHeaderItem isSection>내용</ModalHeaderItem>
            </ModalHeader>
            <ExitButton onClick={handleCloseModal} tabIndex="0">닫기</ExitButton>
          </Modal>
        </>
      )}
      <NotificationOptionIcon
        onClick={handleOpenOption}
        src="https://cdn.icon-icons.com/icons2/3106/PNG/512/gear_settings_options_icon_191642.png"
        tabIndex="0"
        alt="옵션"
        onFocus={() => speak("옵션", { lang: 'ko-KR' })}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleOpenOption();  // Enter 키로 모달 열기
          }
        }}
      />
      {showOption && (
        <>
          <ModalOverlay onClick={handleCloseOption} />
          <ModalOption>
            <OptionHeader>
              <OptionHeaderItem>옵션</OptionHeaderItem>
            </OptionHeader>
            <OptionContainer isFirst>
              <OptionItem
                tabIndex="0"
                onFocus={() => speak("새 게시글 알림", { lang: 'ko-KR' })}
              >
                새 게시글 알림
              </OptionItem>
              <ToggleSwitch
                checked={Notification_1}
                onChange={handleToggleNotification_1}
                tabIndex="0"
                onKeyDown={(event) => handleKeyDownToggleSwitch(event, handleToggleNotification_1)}
              />
            </OptionContainer>
            <OptionContainer>
              <OptionItem
                tabIndex="0"
                onFocus={() => speak("댓글 알림", { lang: 'ko-KR' })}
              >
                댓글 알림
              </OptionItem>
              <ToggleSwitch
                checked={Notification_2}
                onChange={handleToggleNotification_2}
                tabIndex="0"
                onKeyDown={(event) => handleKeyDownToggleSwitch(event, handleToggleNotification_2)}
              />
            </OptionContainer>
            <OptionContainer>
              <OptionItem
                tabIndex="0"
                onFocus={() => speak("메시지 알림", { lang: 'ko-KR' })}
              >
                메시지 알림
              </OptionItem>
              <ToggleSwitch
                checked={Notification_3}
                onChange={handleToggleNotification_3}
                tabIndex="0"
                onKeyDown={(event) => handleKeyDownToggleSwitch(event, handleToggleNotification_3)}
              />
            </OptionContainer>
            <ExitButton 
              onClick={handleCloseOption} 
              tabIndex="0"
              onFocus={() => speak("닫기", { lang: 'ko-KR' })}
            >닫기</ExitButton>
          </ModalOption>
        </>
      )}
    </div>
  );
}

export default Notification;
