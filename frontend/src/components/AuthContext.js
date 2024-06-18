// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// 인증 컨텍스트를 생성합니다.
export const AuthContext = createContext();

//초기값은 localStorage에서 'authToken'을 가져오거나, 없으면 null로 설정합니다.
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null); 
    const [nickname, setNickname] = useState(localStorage.getItem('nickname') || null);

    useEffect(() => {
        // localStorage에서 'authToken'을 가져옵니다.
        const token = localStorage.getItem('authToken');
        const id = localStorage.getItem('userId');
        const name = localStorage.getItem('nickname');
        // 'authToken', 'userId', 'nickname'이 존재하면, 상태를 설정합니다.
        if (token) {
            setAuthToken(token);
        }
        if (id) {
            setUserId(id);
        }
        if (name) {
            setNickname(name);
        }
    }, []);
    
    const login = (token, id, name) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('nickname', name);
        setAuthToken(token);
        setUserId(id);
        setNickname(name);
    };
    
    const logout = () => {
        // localStorage에서 'authToken', 'userId', 'nickname'을 제거합니다.
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('nickname');
        // 상태를 초기화합니다.
        setAuthToken(null);
        setUserId(null);
        setNickname(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, userId, nickname, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};