import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PasswordResetForm() {
    // useState를 사용하여 컴포넌트의 상태를 초기화
    const [formData, setFormData] = useState({
        email: '',
        verificationCode: '',
        newPassword: '',
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
            // 서버에 비밀번호 재설정 요청을 보냄
            await axios.post('http://localhost:4000/api/user/resetPassword', formData);
            alert('비밀번호가 성공적으로 재설정되었습니다.');
            
            // 비밀번호 재설정 완료 후 로그인 페이지로 이동합니다.
            navigate('/login');
        } catch (error) {
            console.error('비밀번호 재설정 실패:', error);
            alert('비밀번호 재설정 중 오류가 발생했습니다.');
        }
    };

    // 화면에 표시되는 내용
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
