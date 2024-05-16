import React from 'react';
import styled from 'styled-components';
import SectionTitle from './SectionTitle';

const ProfileContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px solid #000;
  width: 100%;
`;

const Picture = styled.div`
  margin-top: 5px;
  border: 2px solid #000;
  width: 200px;
  height: 200px;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: low;
  width: inherit;
`;

const InformationTitle = styled.div`
  font-weight: bold;
  margin: 5px 0;
`;

const InformationSection = styled.div`
  flex: 1;
  margin: 5px 0;
`;

const ProfileSection = () => (
  <ProfileContainer>
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
  </ProfileContainer>
);

export default ProfileSection;
