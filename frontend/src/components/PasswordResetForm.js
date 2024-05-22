import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function PasswordResetForm() {
    const [formData, setFormData] = useState({
        email: '',
        verificationCode: '',
        newPassword: '',
        phoneNum: ''
    });
    const history = useHistory(); // useHistory()를 사용하여 history 객체를 가져옴

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4000/api/password/reset', formData);
            alert('비밀번호가 성공적으로 재설정되었습니다.');
            // 비밀번호 재설정 완료 페이지로 이동
            history.push('/login'); // history 객체를 사용하여 이동
        } catch (error) {
            console.error('비밀번호 재설정 실패:', error);
            alert('비밀번호 재설정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>비밀번호 재설정</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
                <input type="tel" name="phoneNum" placeholder="전화번호" value={formData.phoneNum} onChange={handleChange} />
                <input type="text" name="verificationCode" placeholder="인증번호" value={formData.verificationCode} onChange={handleChange} />
                <input type="password" name="newPassword" placeholder="새 비밀번호" value={formData.newPassword} onChange={handleChange} />
                <button type="submit">비밀번호 재설정</button>
            </form>
        </div>
    );
}

export default PasswordResetForm;
