// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserView, MobileView } from 'react-device-detect'
import styled from 'styled-components';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Writing from './pages/Writing';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostRead from './pages/PostRead';
import Main from './pages/Main';
import GroupBuying from './pages/GroupBuying';
import CommunityPage from './pages/CommunityPage';
import Review from './pages/Review';
import ScrollToTop from './components/ScrollTop';
import Arrive from './pages/Arrive';
import AbroadLife from './pages/AbroadLife';
import LeavingInfo from './pages/LeavingInfo';
import './App.css';  // CSS 애니메이션을 위한 파일

const Container = styled.div`
  position: relative;
`;

const App = () => {
  const location = useLocation();
  return (
    <>
    <BrowserView>
      <Container>
      <ScrollToTop/>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade"
        >
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/home" element={<Home/>} /> 
            <Route path="/postlist/:country" element={<PostList/>}/>  
            <Route path="/postread" element={<PostRead/>} />  
            <Route path="/Main" element={<Main/>} />  
            <Route path="/GroupBuying" element={<GroupBuying/>}/>
            <Route path="/CommunityPage" element={<CommunityPage/>}/>
            <Route path="/Review" element={<Review/>}/>
            <Route path="/Arrive" element={<Arrive/>}/>
            <Route path="/AbroadLife" element={<AbroadLife/>}/>
            <Route path="/LeavingInfo" element={<LeavingInfo/>}/>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Container>
    </BrowserView>
    <MobileView>
      mobile
    </MobileView>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
