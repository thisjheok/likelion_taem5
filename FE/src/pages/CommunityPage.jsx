import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import { Link } from 'react-router-dom'; 
const PageLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 16px;
  background-color: #ffffff;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  ${CardContainer}:hover & {
    background-color: #f5f5f5;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
  ${CardContainer}:hover & {
    color: #FFD43B;
  }
`;

const LikeCount = styled.span`
  float: right;
  color: #ff4081;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Author = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const Date = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #999;
`;

const Preview = styled.p`
  margin: 8px 0;
  font-size: 14px;
  color: #333;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const WritingLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const WritingBtn = styled.div`
  background: #FFD43B;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 15px;
  width: 70px;
  padding: 5px 10px;
  border-radius: 5px;
  color:white;
`

const CommunityPage = () => {
  const [postsData, setPostsData] = useState({ category_name: "", posts: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://43.200.226.225/intern/community/postlist/');
        setPostsData(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <PageLayout>
        <Sidebar />
        <MainContent>
          <h1>{postsData.category_name || "커뮤니티"}</h1>
          <WritingBtn><WritingLink to={"/writing"}>글쓰기</WritingLink></WritingBtn>
          <PostGrid>
            {postsData.posts.map((post) => (
              <CardLink to={`/postread/${post.id}`} key={post.id}>
                <CardContainer>
                  <CardHeader>
                    <Title>{post.title} <LikeCount>❤ {post.likes}</LikeCount></Title>
                  </CardHeader>
                  <CardBody>
                    <Author>{post.author_id || '익명'} <Date>{post.created_at || 'Unknown date'}</Date></Author>
                    <Preview>{post.content}</Preview>
                  </CardBody>
                </CardContainer>
              </CardLink>
            ))}
          </PostGrid>
        </MainContent>
      </PageLayout>
    </>
  );
};

export default CommunityPage;