import React, { useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
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

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('likes');
    const [selectedCountry, setSelectedCountry] = useState(null);
  
    const countryInfo = {
      canada: { korName: '캐나다', flag: '🇨🇦' },
      australia: { korName: '호주', flag: '🇦🇺' },
      newzealand: { korName: '뉴질랜드', flag: '🇳🇿' },
      england: { korName: '영국', flag: '🇬🇧' },
      netherlands: { korName: '네덜란드', flag: '🇳🇱' },
      germany: { korName: '독일', flag: '🇩🇪' }
    };
  
    const fetchPosts = useCallback(() => {
      // 실제로는 여기서 API 호출을 통해 데이터를 가져올 것입니다.
      const fetchedPosts = [
        {
          id: 1,
          title: "캐나다 밴쿠버 여행 후기",
          likes: 42,
          author: "여행자123",
          date: "2023-07-15",
          preview: "밴쿠버의 아름다운 자연과 도시 풍경을 소개합니다.",
          country: "canada"
        },
        {
          id: 2,
          title: "호주 시드니 오페라 하우스 탐방",
          likes: 38,
          author: "문화탐험가",
          date: "2023-07-20",
          preview: "시드니의 상징, 오페라 하우스를 둘러봤습니다.",
          country: "australia"
        },
        {
          id: 3,
          title: "독일 베를린 장벽 투어",
          likes: 55,
          author: "역사buff",
          date: "2023-08-05",
          preview: "베를린 장벽의 역사와 현재 모습을 소개합니다.",
          country: "germany"
        },
        {
          id: 4,
          title: "영국 런던 빅벤 야경",
          likes: 60,
          author: "야경사진가",
          date: "2023-08-10",
          preview: "런던의 상징 빅벤의 아름다운 야경을 담았습니다.",
          country: "england"
        },
        {
          id: 5,
          title: "독일 뮌헨 맥주 축제",
          likes: 70,
          author: "맥주애호가",
          date: "2023-09-15",
          preview: "세계적으로 유명한 뮌헨 맥주 축제 체험기입니다.",
          country: "germany"
        }
      ];
      return fetchedPosts;
    }, []);
  
    useEffect(() => {
      const fetchedPosts = fetchPosts();
      setPosts(fetchedPosts);
    }, [fetchPosts]);
  
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
  
    const handleCountrySelect = (country) => {
      setSelectedCountry(country);
    };
  
    const filteredPosts = selectedCountry 
      ? posts.filter(post => post.country === selectedCountry)
      : posts;
  
    return (
      <>
        <Header />
        <PageLayout>
          <Sidebar />
          <MainContent>
            <Country>커뮤니티</Country>
            <FilterButtons>
              {Object.entries(countryInfo).map(([code, info]) => (
                <FilterButton 
                  key={code}
                  onClick={() => handleCountrySelect(code)}
                  active={selectedCountry === code}
                >
                  {info.flag} {info.korName}
                </FilterButton>
              ))}
              <FilterButton 
                onClick={() => setSelectedCountry(null)}
                active={selectedCountry === null}
              >
                전체
              </FilterButton>
            </FilterButtons>
            <FilterButtons>
              <FilterButton 
                onClick={() => handleSortChange('likes')}
                active={sortBy === 'likes'}
              >
                인기순
              </FilterButton>
              <FilterButton 
                onClick={() => handleSortChange('date')}
                active={sortBy === 'date'}
              >
                최신순
              </FilterButton>
            </FilterButtons>
            <PostGrid>
              {filteredPosts.map(post => (
                <PostCard 
                  key={post.id}
                  title={post.title}
                  likes={post.likes}
                  author={post.author}
                  date={post.date}
                  preview={post.preview}
                />
              ))}
            </PostGrid>
          </MainContent>
        </PageLayout>
      </>
    );
  }
  
  export default CommunityPage;