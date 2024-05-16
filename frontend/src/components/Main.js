import styled from 'styled-components';
import Navigation from './Navigation';
import Option from './Option';

// 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  flex-direction: row; /* 자식 요소들을 가로 방향으로 배열합니다. */
  align-items: flex-start; /* 섹션 정렬 설정 */
  height: 1503px; /* 섹션 높이를 3000px로 설정
  width: 100%; /* 섹션의 너비를 100%로 설정 */
  padding-top: 0px; /* 높이만큼 상단 여백 추가 */
  margin: 0 200px 100px 200px; /* 양쪽, 하단 공백 추가 */
  overflow-x: auto; /* 가로로 내용이 넘칠 경우 가로 스크롤 생성 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
`;

const LeftSubContainer = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정합니다. */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px; /* 높이 설정 */
  margin: 20px 20px; /* 양쪽에 공백 추가 */
`;

// 그림을 넣을 컨테이너
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%; /* 왼쪽 컨테이너의 절반 높이로 설정 */
  background-position: center; /* 이미지를 가운데 정렬 */
  outline: 3px double #44C2FF; /* 외곽선: 파란색 대시선, 두께 2픽셀 */
`;

// 텍스트를 넣을 컨테이너
const TextContainer = styled.div`
  width: 50%;
  height: 100%; 
  display: flex;
  flex-direction: column; /* 수직 정렬을 위해 컬럼으로 변경 */
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 37px;
  color: #333; /* 텍스트 컬러 지정 */
  font-weight: bold;
  margin: 20px 20px; /* 양쪽에 20px의 공백 추가 */
`;
const Text2 = styled.span`
  font-size: 22px;
  color: #333; /* 텍스트 컬러 지정 */
  font-weight: Roboto;
`;

// 텍스트 컴포넌트
const TextComponent = () =>
  <> 
    <Text>게시판에 오신것을 환영합니다.</Text>
    <Text2>장애인분들을 위한 게시판입니다!</Text2>
    <Text2>게시판을 통해서 소통해요!</Text2>
    <Text2>여러분의 소중한 의견을 기다립니다!</Text2>
  </>
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
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const BoardTitle = styled.h2`
  width: 100%;
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const BoardContent = styled.p`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
`;

// 비어있는 컨텐츠를 만듭니다.
const numberOfEmptyContents = 18; // 보여줄 빈 컨텐츠 개수
const emptyContents = Array.from({ length: numberOfEmptyContents }, (_, index) => ({ id: index }));


const EmptyBoardContent = styled.div`
  width: 100%;
  height: 50px; /* 예시로 지정한 높이 */
  border-top: 0.5px solid #ccc; /* 외곽선 스타일 및 색상 지정 */
  margin-bottom: 0px; /* 각 컨텐츠 사이의 간격 조정 */
`;

// 우측 서브 컨테이너
const RightSubContainer = styled.div`
  flex: 0.3; /* 남은 공간을 모두 차지하도록 설정합니다. */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1500px; /* 높이 설정 */
  border: 1.8px solid #E4E4E4; /* 외곽선 추가 */
`;

// 제목
const SectionTitle = styled.div`
  color: #426B1F;
  background : linear-gradient(to left top, #ADD8E6, white);
  border-radius: 5px;
  font-size: 25pt;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
  width: inherit;
`;

// 로그인 아이디 비밀번호 찾기 회원가입 버튼 컨테이너
const LoginRegisterContainer = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// 로그인하기 버튼
const Login = styled.div`
    margin-top: 15px;
    cursor: pointer;
    text-align: center;
    background : linear-gradient(to left top, #ADD8E6, white);
    font-size: 16pt;
    font-weight : bold;
    padding: 15px 30px;
    width: 200px;
    border-radius: 10px;
    &:hover {
        background : linear-gradient(to left top, #ADD8E6, skyblue);
      }
`;

// 아이디 비번 찾기 회원가입 컨테이너
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: low;
  justify-content: space-around;
  width: inherit; /* 부모로부터 상속받는다 */
`;

// 회원가입 버튼 (아이디 비번 찾기 버튼)
const Register = styled.div`
    cursor: pointer;
    text-align: center;
    font-size: 10pt;
    font-weight : 500;
    margin: 15px 10px;
    white-space: nowrap;
    &:hover {
        text-decoration: underline;
      }
`;

// 프로필 컨테이너
const ProfileContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid #000; /* 외곽선 추가 */
  width: 100%;
`;

// 프로필 사진
const Picture = styled.div`
  margin-top: 5px;
  border: 2px solid #000; /* 외곽선 추가 */
  width: 200px;
  height: 200px;
`;


// 프로필 정보 컨테이너
const InformationContainer = styled.div`
  display: flex;
  flex-direction: low;
  width: inherit; /* 부모로부터 상속받는다 */
`;

// 프로필 정보(제목)
const InformationTitle = styled.div`
  font-weight: bold;
  margin: 5px 0;
  border: 0;
`;

// 프로필 정보(내용)
const InformationSection = styled.div`
  flex: 1;
  margin: 5px 0;
  border: 0;
`;


// 카테고리 컨테이너
const MenuSelectContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
`;

// 카테고리 선택
const MenuSelect = styled(SectionTitle)`
  text-align: left;
  font-size: 16pt;
  font-weight: bolder;
  text-decoration: none;
  padding: 13px 0;
  width: inherit;  
  border-bottom: 2px double #E4E4E4; /* 외곽선 추가 */
  background: initial;
  cursor: pointer;
  &:hover {
    background : linear-gradient(to left top, #ADD8E6, white);
  }
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
          <BoardTitle> 전체 게시판 </BoardTitle>
          <BoardContent>
            {emptyContents.map(content => (
            <EmptyBoardContent key={content.id} />
          ))}
          </BoardContent>
          
        </BoardContainer>

      </LeftSubContainer>

        
      <RightSubContainer>
        <LoginRegisterContainer>
          <Login> 로그인 </Login>
          <RegisterContainer>
            <Register> 아이디 찾기 </Register>
            <Register> 비밀번호 찾기 </Register>
            <Register> 회원가입 </Register>
          </RegisterContainer>
        </LoginRegisterContainer>
        <MenuSelectContainer> 
          <SectionTitle> 카테고리 </SectionTitle>
          <MenuSelect> &nbsp;&nbsp;자유게시판 </MenuSelect>
          <MenuSelect> &nbsp;&nbsp;공지사항 </MenuSelect>
          <MenuSelect> &nbsp;&nbsp;정부 혜택 </MenuSelect>
          <MenuSelect> &nbsp;&nbsp;정보 </MenuSelect>
        </MenuSelectContainer>
      </RightSubContainer>
    </MainContainer>
    </>
  );
};

export default Main;




// 로그인 완료 후 프로필 화면
{/* <ProfileContainer>
      <SectionTitle>프로필</SectionTitle>
      <Picture/>
      <InformationContainer> 
        <InformationTitle> &nbsp;이름 :  </InformationTitle> <InformationSection> &nbsp;~~ </InformationSection>
      </InformationContainer>
      <InformationContainer> 
        <InformationTitle> &nbsp;~~ :  </InformationTitle> <InformationSection> &nbsp;~~ </InformationSection>
      </InformationContainer>
      <InformationContainer> 
        <InformationTitle> &nbsp;~~ :  </InformationTitle> <InformationSection> &nbsp;~~ </InformationSection>
      </InformationContainer>
    </ProfileContainer> */}