// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation,Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { isMobile } from 'react-device-detect'
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
import Intern from './pages/Intern';
import Study from './pages/Study';
import MobileSignUp from './pages/MobileSignUp';
import MobileLogin from './pages/MobileLogin';
import MobileMain from './pages/MobileMain';
import MobilePostList from './pages/MobilePostList';
import MobilePostRead from './pages/MobilePostRead';
import MobileHotList from './pages/MobileHotList';
import MobileArrive from './pages/MobileArriveList';
import Mobileback from './pages/MobileBackList';
import MobileProfile from './pages/MobileMypage';
import UserInfo from './pages/Userinfo';
import SideBarPage from './pages/MobileSidebar';
import MobileAbroad from './pages/MobileAbroadLife';
import './App.css';  // CSS 애니메이션을 위한 파일
import MobileGroup from './pages/MobileGroup';

const Container = styled.div`
  position: relative;
`;

const App = () => {
  const location = useLocation();
  return (
    <>
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
            <Route path="/postread/:postId" element={<PostRead/>} />  
            <Route path="/" element={<Main/>} />  
            <Route path="/GroupBuying" element={<GroupBuying/>}/>
            <Route
              path="/communitypage"
              element={<CommunityPage />}
            />
            <Route path="/Review" element={<Review/>}/>
            <Route path="/Arrive" element={<Arrive/>}/>
            <Route path="/AbroadLife" element={<AbroadLife/>}/>
            <Route path="/LeavingInfo" element={<LeavingInfo/>}/>
            <Route path="/Intern" element={<Intern/>}/>
            <Route path="/Study" element={<Study/>}/>
            <Route path="/UserInfo" element={<UserInfo/>}/>
            <Route 
              path="/msignup" 
              element={isMobile ? <MobileSignUp /> : <Navigate to="/signup" replace />} 
            />
            <Route 
              path="/mlogin" 
              element={isMobile ? <MobileLogin /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/mmain" 
              element={isMobile} 
            />
            <Route 
              path="/mcommunity" 
              element={isMobile ? <MobilePostList /> : <Navigate to="/CommunityPage" replace />} 
            />
            <Route 
              path="/mhots" 
              element={isMobile ? <MobileHotList /> : <Navigate to="/CommunityPage" replace />} 
            />
             <Route 
              path="/mpostread/:type/:postId" 
              element={isMobile ? <MobilePostRead /> : <Navigate to="/PostRead" replace />} 
            />
             <Route 
              path="/marrive" 
              element={isMobile ? <MobileArrive /> : <Navigate to="/AbroadLife" replace />} 
            />
            <Route 
              path="/mback" 
              element={isMobile ? <Mobileback /> : <Navigate to="/Arrive" replace />} 
            />
            <Route 
              path="/mmypage" 
              element={<MobileProfile />} 
            />
            <Route 
              path="/mback" 
              element={isMobile ? <Mobileback /> : <Navigate to="/Arrive" replace />} 
            />
            <Route path="/sidebar" element={<SideBarPage />} />
            <Route 
              path="/mabroadlife" 
              element={isMobile ? <MobileAbroad /> : <Navigate to="/Arrive" replace />} 
            />
            <Route 
              path="/mgroup" 
              element={isMobile ? <MobileGroup /> : <Navigate to="/GroupBuying" replace />} 
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Container>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
