import styled from 'styled-components';

// 메인 컨테이너
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 1100px;
  width: 100%;
`;

// 왼쪽 부분
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 100px;
`;

// 오른쪽 부분
const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 100px;
`;

// 게시판 혹은 공지사항 박스
const BoxSectionBoard = styled.div`
  background: linear-gradient(to right, #F4FFFF, #CEFFFF);
  box-shadow: 1px 0 10px 1px #44C2FF;
  border-radius: 15px;
  height: 863px;
  margin: 20px;
  position: relative;
`;

// 제목
const SectionTitle = styled.a`
    font-size : 30pt;
    font-weight : bolder;
    text-decoration : none;
    position : relative;
    top : 15px;
    left : 30px;
    padding : 13px 5px;
`;


const Main = () => {
  return (
    <MainContainer>
      <Aside>
        <BoxSectionBoard>
            <SectionTitle href="https://naver.com" target="_self">공지사항</SectionTitle>
        </BoxSectionBoard>
      </Aside>
      <Section>
        <BoxSectionBoard>
          <SectionTitle href="https://naver.com" target="_self">게시판</SectionTitle>
        </BoxSectionBoard>
      </Section>
    </MainContainer>
  );
};

export default Main;