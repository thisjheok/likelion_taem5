//PostList.jsx
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
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
const StyledLink = styled(Link)`
  text-decoration: none;
  /* 원하는 다른 스타일도 추가할 수 있습니다 */
  color: inherit; /* 링크 색상을 부모 요소의 색상으로 상속 */
`;

const Country = styled.div`
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const FilterButtons = styled.div`
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: ${(props) => (props.active ? "#FFD43B" : "#f8f9fa")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ffd43b;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffd43b;
    color: white;
  }
`;

const PostList = () => {
  const { country } = useParams();
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("likes");
  const countryInfo = {
    canada: { korName: "캐나다", flag: "🇨🇦" },
    australia: { korName: "호주", flag: "🇦🇺" },
    newzealand: { korName: "뉴질랜드", flag: "🇳🇿" },
    england: { korName: "영국", flag: "🇬🇧" },
    netherlands: { korName: "네덜란드", flag: "🇳🇱" },
    germany: { korName: "독일", flag: "🇩🇪" },
  };

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(`http://43.200.226.225/swagger/intern/community`);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }, [country]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    getPosts();
  }, [fetchPosts]);

  const CountryDisplay = () => {
    const info = countryInfo[country] || { korName: country, flag: "🏳️" };
    return (
      <Country>
        {info.korName} {info.flag}
      </Country>
    );
  };

  const sortPosts = useCallback(
    (postsToSort) => {
      return [...postsToSort].sort((a, b) => {
        if (sortBy === "likes") {
          return b.likes - a.likes;
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    },
    [sortBy]
  );

  useEffect(() => {
    setPosts((prevPosts) => sortPosts(prevPosts));
  }, [sortBy, sortPosts]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  return (
    <>
      <Header />
      <PageLayout>
        <Sidebar />
        <MainContent>
          <CountryDisplay />
          <FilterButtons>
            <FilterButton
              onClick={() => handleSortChange("likes")}
              active={sortBy === "likes"}
            >
              좋아요 순
            </FilterButton>
            <FilterButton
              onClick={() => handleSortChange("date")}
              active={sortBy === "date"}
            >
              최신순
            </FilterButton>
          </FilterButtons>
          <PostGrid>
            {posts.map((post) => (
              <StyledLink key={post.id} to={`/postread/${post.id}`}>
                <PostCard
                  key={post.id}
                  title={post.title}
                  likes={post.likes}
                  author={post.author}
                  date={post.date}
                  preview={post.preview}
                  continent={post.continent}
                  country={post.country}
                />
              </StyledLink>
            ))}
          </PostGrid>
        </MainContent>
      </PageLayout>
    </>
  );
};

export default PostList;