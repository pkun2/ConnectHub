// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import PasswordResetRequestForm from './components/PasswordResetRequestForm';
import PasswordResetForm from './components/PasswordResetForm';
import PhoneToEmailForm from './components/PhoneToEmailForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/request-reset" component={PasswordResetRequestForm} />
        <Route path="/reset" component={PasswordResetForm} />
        <Route path="/email" component={PhoneToEmailForm} /> {/* "/email" 경로 추가 */}
      </Switch>

      <div>
        <Link to="/signup">회원가입</Link>
      </div>
    </Router>
  );
}

export default App;
