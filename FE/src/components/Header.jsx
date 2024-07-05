import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/Biglogo.png";
import { Link } from 'react-router-dom';

// 헤더 스타일
const Container = styled.div`
  display: flex;
  height: 62px;
  width: 1200px;
  color: #677788;
  font-size: 14px;
  /* padding: 8px 32px; */
  text-align: center;
`;
const Navebar = styled.div`
  height: 46px;
  width: 950px;
  display: flex;
  text-align: center;
  color: #677788;
  font-size: 14px;
  justify-content: end;
  margin-left: 20px;
`;
const Searchbar = styled.input`
  width: 440px;
  height: 40px;
  padding: 8px 50px;
  margin-top: 5px;
  border-radius: 20px;
  border: 0.1px solid #eff0eb;
  margin-right: auto;
  &:focus {
    outline: 0.1px solid #eff0eb;
    border-radius: 20px;
  }
`;
const Profile = styled.button`
  width: 42px;
  height: 42px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
  background-color: inherit;
  border: none;
  &:hover {
    background: #fafabe;
    color: #ffd43b;
    /* transition: 0.5s; */
  }
`;
const Alarm = styled.button`
  width: 42px;
  height: 42px;
  margin-left: auto;
  border: none;
  margin: 5px;
  cursor: pointer;
  background-color: inherit;
  border-radius: 50%;

  &:hover {
    background: #fafabe;
    color: #e7d355;
    /* transition: 0.5s; */
  }
`;

const Logobar = styled(Link)`
  height: 62px;
  width: 245px;
  font-size: 16px;
  color: #677788;
  text-decoration: none;
  display: block;
`;

const Logo = styled.img`
  //여기에 이미지 URL 넣기
  width: 153px;
  height: 40px;
  padding-top: 20px;
  &:hover{
    
  }
`;

const Header = () => {
  return (
    <Container>
      <Logobar to="/Main">
        <Logo src={logo} alt="Logo" />
      </Logobar>
      <Navebar>
        <Searchbar placeholder="Search in" type="text"></Searchbar>
        <Alarm>
          <FontAwesomeIcon icon={faBell} />
        </Alarm>
        <Profile>
          <FontAwesomeIcon icon={faUser} />
        </Profile>
      </Navebar>
    </Container>
  );
};

export default Header;
