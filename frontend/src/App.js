import React from 'react';
import GotoTop from './components/GotoTop';
import Navigation from './components/Navigation';
import ImageView from './components/ImageView';
import Option from './components/Option';
import Foot from './components/Foot';
import Main from './components/Main';

function App() {

  return (

    /* 메인홈페이지 화면 */
    <div>
      {/* 맨 위로 가기 */}
      <GotoTop/>

      {/* 메인 이미지  Desinged by freepik */}

      {/* 메인 콘텐츠 */}
      <Main/>

      {/* 하단바 */}
      <Foot/>
    
    </div>
  );
}

export default App;