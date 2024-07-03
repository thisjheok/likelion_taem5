import React from 'react';
import styled from 'styled-components';
import manImage from '../assets/man.jpg';
import peopleImage from '../assets/people.jpg';
import travelImage from '../assets/travel.jpg';
import logoImage from '../assets/Biglogo.png';

const FullPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #1a1a1a;
  color: #e7d355;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;


const Title = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Subtitle = styled.p`
  font-size: 1.2em;
`;

const CirclesContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 500px;
`;

const CircleContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CircleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  z-index: 1;
`;

const Circle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${props => props.position === 'left' && `
    left: 0;
    top: 50px;
  `}
  
  ${props => props.position === 'center' && `
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  `}
  
  ${props => props.position === 'right' && `
    right: 0;
    top: 100px;
  `}

  &:hover {
    filter: brightness(85%);
    transform: ${props => props.position === 'center' 
      ? 'translateX(-50%) scale(1.05)' 
      : 'scale(1.05)'};
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  }
`;

const App = () => {
  return (
    <FullPageContainer>
      <Header>
        <Title>
          <LogoImage src={logoImage}/>
        </Title>
        <Subtitle>해외 여정을 함께 도와드릴게요</Subtitle>
      </Header>
      <CirclesContainer>
        <Circle color="#d8fa41" position="left">
          <CircleContent src={manImage} alt="Left content" />
          <CircleText>해외취업</CircleText>
        </Circle>
        <Circle color="#fdee42" position="center">
          <CircleContent src={peopleImage} alt="Center content" />
          <CircleText>워킹홀리데이</CircleText>
        </Circle>
        <Circle color="#ffcf5e" position="right">
          <CircleContent src={travelImage} alt="Right content" />
          <CircleText>어학연수</CircleText>
        </Circle>
      </CirclesContainer>
    </FullPageContainer>
  );
};

export default App;