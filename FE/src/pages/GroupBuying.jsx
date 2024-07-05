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


const GroupBuying = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('likes');
  
    const fetchPosts = useCallback(() => {
        // 공동구매에 맞는 데이터 구조로 변경
        const fetchedPosts = [
            {
                id: 1,
                title: "eSim 공동구매",
                likes: 42,
                author: "테크러버",
                date: "2023-07-15",
                preview: "해외 갈 때 필수품 eSim 공동구매를 진행합니다. 15% 할인된 가격으로 구매 가능!",
                participantsCount: "전자기기/부품",
                targetCount: "7/20 까지"
            },
            {
                id: 2,
                title: "uSim 공동구매",
                likes: 38,
                author: "공구토끼",
                date: "2023-07-20",
                preview: "해외 여행에 꼭 필요한 uSim 10% 할인!",
                participantsCount: "전자기기/부품",
                targetCount: "7/24 까지"
            },
            {
                id: 3,
                title: "도쿄 디즈니랜드 이용권",
                likes: 55,
                author: "미키마우스",
                date: "2023-07-23",
                preview: "같이 공동 구매하면 최대 30% 할인! 함께 즐겁게 놀아요.",
                participantsCount: "이용권",
                targetCount: "7/30 까지"
            },
            {
                id: 4,
                title: "독일 항공권 공구",
                likes: 27,
                author: "뢰브",
                date: "2023-07-14",
                preview: "같이 공동 구매하면 최대 20% 할인! 비행기 특가!",
                participantsCount: "항공권",
                targetCount: "7/19 까지"
            },
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
  
    return (
        <>
            <Header />
            <PageLayout>
                <Sidebar />
                <MainContent>
                <Country>공동구매</Country>
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
                        {posts.map(post => (
                            <PostCard 
                                key={post.id}
                                title={post.title}
                                likes={post.likes}
                                author={post.author}
                                date={post.date}
                                preview={post.preview}
                                continent={post.participantsCount}
                                country={post.targetCount}
                            />
                        ))}
                    </PostGrid>
                </MainContent>
            </PageLayout>
        </>
    );
  }
  
  export default GroupBuying;