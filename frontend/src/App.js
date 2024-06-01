import React from 'react';
import GotoTop from './components/GotoTop';
import Foot from './components/Foot';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
          <GotoTop />
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path='/write' element={<WriteBoardPost} />
          </Routes>
          <Foot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
