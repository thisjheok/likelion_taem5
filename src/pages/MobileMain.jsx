import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../assets/Biglogo.png'; // 로고 이미지 경로
import bannerImage from '../assets/banner.png'; // 배너 이미지 경로
import { dummyPosts } from '../dummyPost';
import { hotPosts } from '../HotPost'; // hotPosts 데이터 가져오기

const PageContainer = styled.div`
  width: 390px;
  min-height: 100vh;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ScrollableContent = styled.div`
  width: 100%;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountryBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoardName = styled.span``;

const PreviewTitle = styled.span`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  cursor: pointer; /* 클릭 가능하도록 커서 스타일 변경 */
`;

const LogoImage = styled.img`
  width: 300px;
  margin-top: 70px;
  margin-bottom: 30px;
`;

const BannerImage = styled.img`
  width: 90%;
  margin-bottom: 20px;
`;

const Section = styled.div`
  width: 90%;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const More = styled.span`
  font-size: 14px;
  color: #888;
  cursor: pointer; /* 클릭 가능하도록 커서 스타일 변경 */
`;

const Card = styled.div`
  background-color: #F8F8F8;
  border-radius: 10px;
  padding: 15px;
`;

const CardItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer; /* 클릭 가능하도록 커서 스타일 변경 */
`;

const HeartIcon = styled.span`
  color: #FFD700;
  margin-right: 5px;
`;

const BottomNav = styled.div`
  position: absolute;
  bottom: 0;
  width: 390px;
  height: 60px;
  background-color: #ffd9007d;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled.div`
  font-size: 24px;
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
        <NavItem>☰</NavItem>
        <NavItem>⌂</NavItem>
        <NavItem>👤</NavItem>
      </BottomNav>
    </PageContainer>
  );
};

export default MobileMain;
