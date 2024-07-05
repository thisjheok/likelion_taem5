import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../assets/Biglogo.png'; // 로고 이미지 경로
import bannerImage from '../assets/banner.png'; // 배너 이미지 경로
import { dummyPosts } from '../dummyPost';
import { hotPosts } from '../HotPost'; // hotPosts 데이터 가져오기
const PageContainer = styled.div`
  width: 100%;
  max-width: 480px; // 모바일 화면 크기에 맞춤
  min-height: 100vh;
  margin: 0 auto; // 중앙 정렬
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden; // 가로 스크롤 방지
`;

const ScrollableContent = styled.div`
  width: 100%;
  max-width: 600px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10%; // 5%에서 7%로 증가
  margin-top: 30px;
`;

const CountryBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const BoardName = styled.span`
  flex: 0 0 30%;
  font-size: 0.9rem;
`;

const PreviewTitle = styled.span`
  flex: 1;
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  padding-left: 0.5rem;
`;

const LogoImage = styled.img`
  width: 80%;
  max-width: 300px;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

const BannerImage = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  width: 90%; // 100%에서 90%로 변경
  margin-bottom: 1.5rem;
  padding: 0 5%; // 좌우 패딩 추가
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const More = styled.span`
  font-size: 0.9rem;
  color: #888;
  cursor: pointer;
`;

const Card = styled.div`
  background-color: #F8F8F8;
  border-radius: 10px;
  padding: 1rem;
`;

const CardItem = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 0.9rem;
`;

const HeartIcon = styled.span`
  color: #FFD700;
  margin-right: 0.3rem;
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
  font-size: 1.5rem;
`;

const MobileMain = () => {
  const navigate = useNavigate();

  const getFirstPostTitle = (country) => {
    const post = dummyPosts.find(post => post.country === country);
    return post ? post.title : "";
  };

  const getFirstPostId = (country) => {
    const post = dummyPosts.find(post => post.country === country);
    return post ? post.id : null;
  };

  const handleMoreClick = () => {
    navigate('/mcommunity');
  };

  const handleHotMoreClick = () => {
    navigate('/mhots');
  };

  const handleOpenSideBar = () => {
    navigate('/sidebar');
  };

  const handlePreviewClick = (country) => {
    const postId = getFirstPostId(country);
    if (postId) {
      navigate(`/mpostread/dummy/${postId}`);
    }
  };

  const handleHotPostClick = (postId) => {
    navigate(`/mpostread/hot/${postId}`);
  };

  // 핫 게시물 좋아요 순으로 정렬
  const sortedHotPosts = hotPosts.slice().sort((a, b) => b.likes - a.likes).slice(0, 5);

  return (
    <PageContainer>
      <ScrollableContent>
        <LogoImage src={logoImage} alt="Through World" />
        <BannerImage src={bannerImage} alt="Banner" />
        
        <Section>
          <SectionTitle>
            국가별 커뮤니티
            <More onClick={handleMoreClick}>more</More>
          </SectionTitle>
          <Card>
            <CountryBoard>
              <BoardName>캐나다 게시판</BoardName>
              <PreviewTitle onClick={() => handlePreviewClick("캐나다")}>{getFirstPostTitle("캐나다")}</PreviewTitle>
            </CountryBoard>
            <CountryBoard>
              <BoardName>호주 게시판</BoardName>
              <PreviewTitle onClick={() => handlePreviewClick("호주")}>{getFirstPostTitle("호주")}</PreviewTitle>
            </CountryBoard>
            <CountryBoard>
              <BoardName>독일 게시판</BoardName>
              <PreviewTitle onClick={() => handlePreviewClick("독일")}>{getFirstPostTitle("독일")}</PreviewTitle>
            </CountryBoard>
            <CountryBoard>
              <BoardName>영국 게시판</BoardName>
              <PreviewTitle onClick={() => handlePreviewClick("영국")}>{getFirstPostTitle("영국")}</PreviewTitle>
            </CountryBoard>
          </Card>
        </Section>
        
        <Section>
          <SectionTitle>
            HOT 게시물
            <More onClick={handleHotMoreClick}>more</More>
          </SectionTitle>
          <Card>
            {sortedHotPosts.map(post => (
              <CardItem key={post.id} onClick={() => handleHotPostClick(post.id)}>
                {post.title}
                <span><HeartIcon>♥</HeartIcon>{post.likes}</span>
              </CardItem>
            ))}
          </Card>
        </Section>
      </ScrollableContent>
      
      <BottomNav>
            <NavItem onClick={handleOpenSideBar}>☰</NavItem>
            <NavItem>
              <Link to={`/mmain`} style={{ color: '#333', textDecoration: 'none' }}>⌂</Link>
            </NavItem>
            <NavItem><Link to={`/mmypage`} style={{ color: '#333', textDecoration: 'none' }}>👤</Link></NavItem>
      </BottomNav>
    </PageContainer>
  );
};

export default MobileMain;
