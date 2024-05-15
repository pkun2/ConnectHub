import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';
import BoardContent from './BoardContent';

// 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: row; /* 자식 요소들을 가로 방향으로 배열합니다. */
  align-items: flex-start; /* 섹션 정렬 설정 */
  height: 2000px; /* 섹션 높이를 3000px로 설정
  width: 100%; /* 섹션의 너비를 100%로 설정 */
  padding-top: 0px; /* 높이만큼 상단 여백 추가 */
  margin: 0 200px; /* 양쪽에 공백 추가 */
  overflow-x: auto; /* 가로로 내용이 넘칠 경우 가로 스크롤 생성 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
  border: 2px solid #000; /* 외곽선 추가 */
`;

const LeftSubContainer = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정합니다. */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px; /* 높이 설정 */
  border: 2px solid #000; /* 외곽선 추가 */
`;

// 그림을 넣을 컨테이너
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%; /* 왼쪽 컨테이너의 절반 높이로 설정 */
  background-position: center; /* 이미지를 가운데 정렬 */
  border: 2px solid #000; /* 외곽선 추가 */
`;

// 텍스트를 넣을 컨테이너
const TextContainer = styled.div`
  width: 50%;
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000; /* 외곽선 추가 */
`;

// 텍스트 컴포넌트
const TextComponent = () => <span>장애인들을 위한 게시판 개설</span>;

// 이미지를 넣을 컨테이너
const PictureContainer = styled.div`
  width: 50%;
  height: 100%; 
  overflow: hidden; /* 내용이 넘치는 경우 가려짐 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 그림 URL
const imageUrl = "https://img.freepik.com/free-vector/men-women-welcoming-people-with-disabilities-group-people-meeting-blind-female-character-male-wheelchair_74855-18436.jpg?t=st=1715345864~exp=1715349464~hmac=174d5e762b369d4beba592670b688d3510807248c829290eee0a091388aae385&w=826";

// 이미지 컴포넌트
const ImageComponent = () => <img src={imageUrl} alt="그림" style={{ width: '110%', height: '110%' }} />;

// 게시판 내용을 넣을 컨테이너
const BoardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// 우측 서브 컨테이너
const RightSubContainer = styled.div`
  flex: 0.3; /* 남은 공간을 모두 차지하도록 설정합니다. */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px; /* 높이 설정 */
  border: 2px solid #000; /* 외곽선 추가 */
`;

// 게시판 혹은 공지사항 박스
const BoxSectionBoard = styled.div`
  background: linear-gradient(to right, #F4FFFF, #CEFFFF);
  box-shadow: 1px 0 10px 1px #44C2FF;
  border-radius: 15px;
  height: 80%;
  width: 80%;
  margin: 20px;
  position: relative;
`;

// 제목
const SectionTitle = styled.a`
  font-size: 30pt;
  font-weight: bolder;
  text-decoration: none;
  padding: 13px 5px;
`;


const Main = () => {
  return (
    <>
    <Navigation/>
    <Option/>
    <MainContainer>
      <LeftSubContainer>
        <ImageContainer>
          <TextContainer>
            <TextComponent/>
          </TextContainer>

          <PictureContainer>
            <ImageComponent/>
          </PictureContainer>
        </ImageContainer>

        <BoardContainer>
          
            <SectionTitle href="https://naver.com" target="_self">게시판</SectionTitle>
            <BoardContent/>
          
        </BoardContainer>  
      </LeftSubContainer>
      <RightSubContainer>
          <SectionTitle href="https://naver.com" target="_self">프로필</SectionTitle>
      </RightSubContainer>
    </MainContainer>
    </>
  );
};

export default Main;
