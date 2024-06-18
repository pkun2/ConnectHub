import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import ToggleSwitch from './ToggleSwitch';
import { speak } from '../speech/speechUtils';
import axios from 'axios';
import { AuthContext } from './AuthContext';

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

const NotificationItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

function Notification() {
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notification1, setNotification1] = useState(false);
  const [notification2, setNotification2] = useState(false);
  const { userId } = useContext(AuthContext); // AuthContext에서 userId를 가져옴

  useEffect(() => {
    // 알림 목록 조회
    axios.get(`http://localhost:4000/api/notifications/${userId}`)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });

    // 알림 설정 조회
    axios.get(`http://localhost:4000/api/notifications/settings/read/${userId}`)
      .then(response => {
        setNotification1(response.data.newPostNotificationEnabled);
        setNotification2(response.data.newCommentNotificationEnabled);
      })
      .catch(error => {
        console.error('Error fetching notification settings:', error);
      });
  }, []);

  const speakNotifications = (notifications) => {
    if (notifications.length > 0) {
      const messages = notifications.map(notification => notification.message).join(". "); // 알림 메시지를 모두 합쳐서 읽기
      speak(messages, { lang: 'ko-KR' });
    } 
  };

  const handleOpenModal = () => {
    setShowModal(true);
    speak('알림 창이 열렸습니다', { lang: 'ko-KR' });
    speakNotifications(notifications); // 알림 메시지를 읽기
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

  const handleToggleNotification1 = () => {
    const newSetting = !notification1;
    axios.put(`http://localhost:4000/api/notifications/settings/${userId}`, {
      newPostNotificationEnabled: newSetting,
      newCommentNotificationEnabled: notification2
    }).then(() => {
      setNotification1(newSetting);
      speak(newSetting ? '새 게시글 알림이 켜졌습니다' : '새 게시글 알림이 꺼졌습니다', { lang: 'ko-KR' });
    }).catch(error => {
      console.error('Error updating notification setting:', error);
    });
  };

  const handleToggleNotification2 = () => {
    const newSetting = !notification2;
    axios.put(`http://localhost:4000/api/notifications/settings/${userId}`, {
      newPostNotificationEnabled: notification1,
      newCommentNotificationEnabled: newSetting
    }).then(() => {
      setNotification2(newSetting);
      speak(newSetting ? '댓글 알림이 켜졌습니다' : '댓글 알림이 꺼졌습니다', { lang: 'ko-KR' });
    }).catch(error => {
      console.error('Error updating notification setting:', error);
    });
  };

  const handleKeyDownToggleSwitch = (event, toggleFunction) => {
    if (event.key === 'Enter') {
      toggleFunction();
    }
  };

  const handleFocusNotification = (message) => {
    speak(message, { lang: 'ko-KR' });
  };

  const handleDeleteNotification = (notificationId) => {
    axios.delete(`http://localhost:4000/api/notifications/${notificationId}`)
      .then(() => {
        setNotifications(notifications.filter(notification => notification.notificationId !== notificationId));
        speak('알림이 삭제되었습니다', { lang: 'ko-KR' });
      })
      .catch(error => {
        console.error('Error deleting notification:', error);
      });
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
          <ModalHeaderItem isSection>내용</ModalHeaderItem>
        </ModalHeader>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.notificationId}
            tabIndex="0"
            onFocus={() => handleFocusNotification(notification.message)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleDeleteNotification(notification.notificationId);
              }
            }}
          >
            <div>{notification.message}</div>
          </NotificationItem>
        ))}
        <ExitButton 
          onClick={handleCloseModal}
          tabIndex="0"
          onFocus={() => speak('닫기 버튼', { lang: 'ko-KR' })}
        >
          닫기
        </ExitButton>
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
            checked={notification1} 
            onChange={handleToggleNotification1} 
            tabIndex="0" 
            onKeyDown={(event) => handleKeyDownToggleSwitch(event, handleToggleNotification1)}
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
            checked={notification2} 
            onChange={handleToggleNotification2} 
            tabIndex="0" 
            onKeyDown={(event) => handleKeyDownToggleSwitch(event, handleToggleNotification2)}
          />
        </OptionContainer>
        <ExitButton 
          onClick={handleCloseOption}
          tabIndex="0"
          onFocus={() => speak('닫기', { lang: 'ko-KR' })}
        >
          닫기
        </ExitButton>
      </Modal>
    </div>
  );
}

export default Notification;
