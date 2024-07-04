import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MobileCard from '../components/MobileCard';
import { hotPosts } from '../HotPost';

const PageContainer = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  background-color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  height: 60px;
  background-color: #ffec7e;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;

const NavItem = styled.div`
  font-size: 24px;
`;

const MobileHotList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 좋아요 순으로 정렬된 게시물 설정
    const sortedHotPosts = hotPosts.slice().sort((a, b) => b.likes - a.likes);
    setPosts(sortedHotPosts);
  }, []);

  return (
    <PageContainer>
      <ScrollableContent>
        <Title>HOT 게시물</Title>
        {posts.map(post => (
          <Link to={`/mpostread/hot/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MobileCard {...post} />
          </Link>
        ))}
      </ScrollableContent>
      <BottomNav>
        <NavItem>☰</NavItem>
        <NavItem>⌂</NavItem>
        <NavItem>👤</NavItem>
      </BottomNav>
    </PageContainer>
  );
};

export default MobileHotList;
