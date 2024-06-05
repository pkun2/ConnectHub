// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 인증 컨텍스트를 생성합니다.
export const AuthContext = createContext();

//초기값은 localStorage에서 'authToken'을 가져오거나, 없으면 null로 설정합니다.
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    useEffect(() => {
        // localStorage에서 'authToken'과 'user'를 가져옵니다.
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        // 'authToken'이 존재하면, authToken 상태를 업데이트합니다.
        if (token) {
            setAuthToken(token);
        }

        // 'user'가 존재하면, user 상태를 업데이트합니다.
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token);
            setUser(user);
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };
    
    const logout = () => {
        // localStorage에서 'authToken'과 'user'를 제거합니다.
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // authToken과 user 상태를 null로 설정합니다.
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};