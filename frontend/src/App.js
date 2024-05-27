import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GotoTop from './components/GotoTop';
import Foot from './components/Foot';
import Main from './components/Main';
import LoginForm from './components/LoginForm'; // 로그인 폼 컴포넌트 import

function App() {
  return (
    <Router>
      <div>
        {/* 맨 위로 가기 */}
        <GotoTop />

        {/* 라우팅 설정 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

        {/* 하단바 */}
        <Foot />
      </div>
    </Router>
  );
}

export default App;
