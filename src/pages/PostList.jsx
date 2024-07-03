import React, { useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
import { useParams } from 'react-router-dom';

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

const Country = styled.div`
    color: #333;
    margin: 0;
    font-size: 24px;
    font-weight: bold;
`

const FilterButtons = styled.div`
margin-bottom: 20px;
`;

const FilterButton = styled.button`
margin-right: 10px;
padding: 5px 10px;
background-color: ${props => props.active ? '#FFD43B' : '#f8f9fa'};
color: ${props => props.active ? 'white' : 'black'};
border: 1px solid #FFD43B;
border-radius: 5px;
cursor: pointer;

&:hover {
  background-color: #FFD43B;
  color: white;
}
`;

const PostList = () => {
  const { country } = useParams();
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('likes'); // 'likes' or 'date'
  const countryInfo = {
    canada: { korName: '캐나다', flag: '🇨🇦' },
    australia: { korName: '호주', flag: '🇦🇺' },
    newzealand: { korName: '뉴질랜드', flag: '🇳🇿' },
    england: { korName: '영국', flag: '🇬🇧' },
    netherlands: { korName: '네덜란드', flag: '🇳🇱' },
    germany: { korName: '독일', flag: '🇩🇪' }
  };
  const fetchPosts = useCallback(() => {
      // 여기서 DB나 API로부터 데이터를 가져옵니다.
      const fetchedPosts = [
          {
              id: 1,
              title: "파리에서의 3일",
              likes: 42,
              author: "여행자123",
              date: "2023-07-15",
              preview: "에펠탑부터 루브르 박물관까지, 파리의 주요 명소를 둘러본 여행기입니다.",
              continent: "유럽",
              country: "france"
          },
          {
              id: 2,
              title: "베르사유 궁전 탐방",
              likes: 38,
              author: "역사탐험가",
              date: "2023-07-20",
              preview: "프랑스의 역사가 살아숨쉬는 베르사유 궁전을 탐방했습니다.",
              continent: "유럽",
              country: "australia"
          },
          // ... 더 많은 포스트 데이터
      ];
      const filteredPosts = fetchedPosts.filter(post => post.country === country);
      return filteredPosts;
    }, [country]);


  useEffect(() => {
    const fetchedPosts = fetchPosts();
    setPosts(fetchedPosts);
  }, [fetchPosts]);

  const CountryDisplay = () => {
    const info = countryInfo[country] || { korName: country, flag: '🏳️' };
    return (
      <Country>
        {info.korName} {info.flag}
      </Country>
    );
  };

  const sortPosts = useCallback((postsToSort) => {
    return [...postsToSort].sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  }, [sortBy]);

  useEffect(() => {
    setPosts(prevPosts => sortPosts(prevPosts));
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
                          onClick={() => handleSortChange('likes')}
                          active={sortBy === 'likes'}
                      >
                          좋아요 순
                      </FilterButton>
                      <FilterButton 
                          onClick={() => handleSortChange('date')}
                          active={sortBy === 'date'}
                      >
                          최신순
                      </FilterButton>
                  </FilterButtons>
                  <PostGrid>
                      {posts.map(post => (
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
                      ))}
                  </PostGrid>
              </MainContent>
          </PageLayout>
      </>
  );
}

export default PostList;