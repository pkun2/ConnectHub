import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from './components/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/changePassword" element={<MyPage />} />
        <Route path="/changeNickname" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
