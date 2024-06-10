// PhoneToEmailForm.js

import React, { useState } from 'react';
import axios from 'axios';

function PhoneToEmailForm() {
    // useState를 사용하여 컴포넌트의 상태를 초기화
    const [phoneNum, setPhoneNum] = useState('');
    const [foundEmail, setFoundEmail] = useState('');

    // 입력 값이 변경될 때마다 상태를 업데이트하는 함수
    const handleChange = (event) => {
        setPhoneNum(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/user/findEmail', { phoneNum });
            setFoundEmail(response.data);
        } catch (error) {
            console.error('이메일 찾기 실패:', error);
        }
    };

    return (
        <div>
            <h2>이메일 찾기</h2>
            <form onSubmit={handleSubmit}>
                <input type="tel" value={phoneNum} onChange={handleChange} placeholder="전화번호 입력" />
                <button type="submit">이메일 찾기</button>
            </form>
            {foundEmail && <p>찾은 이메일: {foundEmail}</p>}
        </div>
    );
}
//
export default PhoneToEmailForm;
