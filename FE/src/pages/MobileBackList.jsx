import React, { useState , useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MobileCard from '../components/MobileCard';
import {Link,useNavigate} from 'react-router-dom';
import { infoBeforeReturningHome } from '../Comeback';

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

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: ${props => props.active ? '#ffd43b' : 'white'};
  color: ${props => props.active ? 'black' : '#333'};
  font-size: 14px;
  cursor: pointer;
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 15px 0;
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



const Mobileback = () => {
    const [posts, setPosts] = useState([]);
    const [activeFilter, setActiveFilter] = useState('전체');
    const [activeSort, setActiveSort] = useState('인기순');
    const navigate = useNavigate();
    const countryInfo = {
      전체: { flag: '🌍' },
      캐나다: { flag: '🇨🇦' },
      호주: { flag: '🇦🇺' },
      뉴질랜드: { flag: '🇳🇿' },
      영국: { flag: '🇬🇧' },
      네덜란드: { flag: '🇳🇱' },
      독일: { flag: '🇩🇪' },
    };
  
    useEffect(() => {
        setPosts(infoBeforeReturningHome);
      }, []);
  
    const sortPosts = useCallback((postsToSort) => {
      return [...postsToSort].sort((a, b) => {
        if (activeSort === '인기순') {
          return b.likes - a.likes;
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    }, [activeSort]);
  
    const handleOpenSideBar = () => {
      navigate('/sidebar');
    };
    const filteredAndSortedPosts = useCallback(() => {
      let filtered = activeFilter === '전체' ? posts : posts.filter(post => post.country === activeFilter);
      return sortPosts(filtered);
    }, [posts, activeFilter, sortPosts]);
  
    return (
        <PageContainer>
          <ScrollableContent>
            <Title>귀국 전 정보</Title>
            <FilterContainer>
              {Object.entries(countryInfo).map(([country, info]) => (
                <FilterButton 
                  key={country} 
                  active={activeFilter === country}
                  onClick={() => setActiveFilter(country)}
                >
                  {info.flag} {country}
                </FilterButton>
              ))}
            </FilterContainer>
            <Divider />
            <FilterContainer>
              {['인기순', '최신순'].map(sort => (
                <FilterButton 
                  key={sort} 
                  active={activeSort === sort}
                  onClick={() => setActiveSort(sort)}
                >
                  {sort}
                </FilterButton>
              ))}
            </FilterContainer>
            {filteredAndSortedPosts().map(post => (
            <Link to={`/mpostread/back/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MobileCard {...post} />
            </Link>
          ))}
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
  
  export default Mobileback;