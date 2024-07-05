import React from 'react';
import styled from 'styled-components';
import logoImage from '../assets/Biglogo.png'; 
import { useNavigate, Link } from 'react-router-dom';

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFDF9;
`;

const LogoArea = styled.div`
  padding: 20px;
  text-align: center;
  margin-top: 60px;
`;

const LogoImage = styled.img`
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const MenuCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const MenuItem = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CloseButtonArea = styled.div`
  padding: 20px;
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: #E0E0E0;
  color: #333;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const SideBarPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <SideBarContainer>
      <LogoArea>
        <LogoImage src={logoImage} alt="Through World" />
      </LogoArea>
      <ContentArea>
        <MenuCard>
          <MenuItem><StyledLink to="/mcommunity">국가별 커뮤니티</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/mhots">HOT 게시글</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/marrive">출국 전 정보</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/mabroadlife">해외 생활 정보</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/mback">귀국 전 정보</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/mgroup">공동 구매</StyledLink></MenuItem>
        </MenuCard>
      </ContentArea>
      <CloseButtonArea>
        <CloseButton onClick={handleClose}>닫기</CloseButton>
      </CloseButtonArea>
    </SideBarContainer>
  );
};

export default SideBarPage;