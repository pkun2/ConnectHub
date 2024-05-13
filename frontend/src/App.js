// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // react-router-dom에서 BrowserRouter 및 Route, Switch import
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm'; 
import { Link } from 'react-router-dom'; // Link import

function App() {
  return (
    <Router> 
      <Switch> {/* Switch로 감싸 여러 라우트 중 하나만 렌더링되도록 설정 */}
        <Route path="/login" exact component={LoginForm} /> {/* '/login' 경로에는 LoginForm이 렌더링 */}
        <Route path="/signup" component={SignUpForm} />     {/* '/signup' 경로에는 SignUpForm이 렌더링 */}
      </Switch>
 
      <div>
        <Link to="/signup">회원가입</Link>
      </div>
    </Router>
  );
}

export default App;
