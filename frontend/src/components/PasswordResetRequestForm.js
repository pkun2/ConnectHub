import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

function PasswordResetRequestForm() {
    // useState를 사용하여 컴포넌트의 상태를 초기화
    const [formData, setFormData] = useState({
        email: '',
        phoneNum: ''
    });
    // useHistory()를 사용하여 history 객체를 가져옴
    const navigate = useNavigate();

    // 입력 값이 변경될 때마다 상태를 업데이트하는 함수
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 서버에 인증번호 요청을 보냄
            await axios.post('http://localhost:4000/api/password/requestReset', formData);
            alert('비밀번호 재설정 인증번호가 SMS로 전송되었습니다.');

            // 인증번호 요청 완료 후 비밀번호 재설정 페이지로 이동합니다.
            navigate('/reset'); // Use history to navigate to '/reset-sent'
        } catch (error) {
            console.error('비밀번호 재설정 요청 실패:', error);
            alert('비밀번호 재설정 요청 중 오류가 발생했습니다.');
        }
    };

    // 화면에 표시되는 내용
    return (
        <div>
            <h2>비밀번호 재설정 요청</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
                <input type="tel" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} />
                <button type="submit">인증번호 요청</button>
            </form>
        </div>
    );
}

export default PasswordResetRequestForm;
