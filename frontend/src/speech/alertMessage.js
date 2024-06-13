import { useEffect } from 'react';
import { speak } from '../speech/speechUtils';

const AlertMessage = ({ message }) => {
    useEffect(() => {
        if (message) {
            speak(message, { lang: 'ko-KR' });
        }
    }, [message]);

    return null; // 화면에 렌더링하지 않기 위해 null 반환
};

export default AlertMessage;
