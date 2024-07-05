import React from 'react';
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import logoImage from '../assets/Biglogo.png';
import lion from '../assets/아기사자.png';
const PageContainer = styled.div`
  width: 390px;
  min-height: 100vh;
  background-color: #FFFDF9;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Logo = styled.img`
  width: 200px;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-top: 70px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserName = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const UserProfileCard = styled.div`
  width: 85%;
  background-color: #FFFFFF;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileInfo = styled.div`
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:first-child {
    background-color: #FFD700;
    color: #333;
    &:hover {
      background-color: #FFC700;
    }
  }

  &:last-child {
    background-color: #E0E0E0;
    color: #333;
    &:hover {
      background-color: #D0D0D0;
    }
  }
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  background-color: #ffd9007d;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled.div`
  font-size: 24px;
  color: #333;
`;

const MobileProfile = () => {
  const navigate = useNavigate();
  const handleOpenSideBar = () => {
    navigate('/sidebar');
  };
  return (
    <PageContainer>
      <Logo src={logoImage} alt="Through World" />
      <ProfileSection>
        <ProfileImage src={lion} alt="Profile" />
        <UserName>아기사자 님</UserName>
      </ProfileSection>
      <UserProfileCard>
        <ProfileInfo>아이디: likeLion</ProfileInfo>
        <ProfileInfo>생년월일: 2000.01.01</ProfileInfo>
        <ProfileInfo>전화번호: 010-xxxx-xxxx</ProfileInfo>
        <ProfileInfo>보유포인트: 100P</ProfileInfo>
        <ProfileInfo>이메일: abc@naver.com</ProfileInfo>
        <ProfileInfo>작성한 글의 수: 4</ProfileInfo>
      </UserProfileCard>
      <ButtonContainer>
        <Button>개인정보 수정</Button>
        <Button>회원 탈퇴</Button>
      </ButtonContainer>
      <BottomNav>
      <NavItem onClick={handleOpenSideBar}>☰</NavItem>
        <NavItem>
          <Link to="/mmain" style={{ color: '#333', textDecoration: 'none' }}>⌂</Link>
        </NavItem>
        <NavItem><Link to={`/mmypage`} style={{ color: '#333', textDecoration: 'none' }}>👤</Link></NavItem>
      </BottomNav>
    </PageContainer>
  );
};

export default MobileProfile;