import React from 'react';
import AdminPage from './components/AdminPage';
import GotoTop from './components/GotoTop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* 맨 위로 가기 */}
      <GotoTop />

      {/* 라우팅 설정 */}
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/admin/:id" element={<AdminPage />} />
        <Route path="/admin/:id/comment" element={<AdminPage />} />
      </Routes>     
    </Router>
  );
}

export default App;
