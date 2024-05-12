import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import GotoTop from './components/GotoTop';
import Navigation from './components/Navigation';
import ImageView from './components/ImageView';
import Option from './components/Option';
import Foot from './components/Foot';
import Main from './components/Main';

function App() {
  
  return (
    <div>
      {/* 맨 위로 가기 */}
      <GotoTop/>

      {/* 네비게이션 바 */}
      <Navigation/>

      {/* 옵션 바 */}
      <Option/>

      {/* 메인 이미지  Desinged by freepik */}
      <ImageView backgroundImage={"https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826"}/>

      {/* 메인 콘텐츠 */}
      <Main/>

      {/* 하단바 */}
      <Foot/>
    </div>
  );
}

export default App;