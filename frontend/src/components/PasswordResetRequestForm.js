import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

function PasswordResetRequestForm() {
    const [formData, setFormData] = useState({
        email: '',
        phoneNum: ''
    });
    const history = useHistory(); // Initialize history

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4000/api/password/requestReset', formData);
            alert('비밀번호 재설정 링크가 SMS로 전송되었습니다.');
            history.push('/reset'); // Use history to navigate to '/reset-sent'
        } catch (error) {
            console.error('비밀번호 재설정 요청 실패:', error);
            alert('비밀번호 재설정 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>비밀번호 재설정 요청</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
                <input type="tel" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} />
                <button type="submit">재설정 링크 요청</button>
            </form>
        </div>
    );
}

export default PasswordResetRequestForm;
