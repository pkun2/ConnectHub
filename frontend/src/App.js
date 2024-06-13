import React from 'react';
import GotoTop from './components/GotoTop';
import Foot from './components/Foot';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from './components/MyPage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import PasswordResetRequestForm from './components/PasswordResetRequestForm';
import PasswordResetForm from './components/PasswordResetForm';
import PhoneToEmailForm from './components/PhoneToEmailForm';
import { AuthProvider } from './components/AuthContext';
import WriteBoardPost from './components/WriteBoardPost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          {/* 맨 위로 가기 */}
          <GotoTop />

          {/* 라우팅 설정 */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/request-reset" element={<PasswordResetRequestForm />} />
            <Route path="/reset" element={<PasswordResetForm />} />
            <Route path="/email" element={<PhoneToEmailForm />} />
            <Route path='/write' element={<WriteBoardPost/>} />
            <Route path="/changePassword" element={<MyPage />} />
            <Route path="/changeNickname" element={<MyPage />} />
          </Routes>

          {/* 하단바 */}
          <Foot />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
