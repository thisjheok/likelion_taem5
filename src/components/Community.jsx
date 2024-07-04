import React from "react";
import styled from "styled-components";
import canada from "../assets/canada.png";
import australia from "../assets/australia.png";
import newzealand from "../assets/newzealand.png";
import england from "../assets/england.png";
import netherlands from "../assets/netherlands.png";
import germany from "../assets/germany.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const CommunityBox = styled.div`
  width: 400px;
  height: 520px;
  border-radius: 20px;
  border: 0.1px solid #eff0eb;
  box-shadow: 0 0.375rem 0.75rem rgba(140, 152, 164, 0.075);
  margin: 20px;
  margin-top: 10px;
`;
const Title = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #0a124d;
  border-bottom: 0.5px solid #dcdcdc;
  padding-top: 20px;
  background-color: lightyellow;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
`;

const CommunityDiv = styled.div`
  display: flex;
  width: 350px;
  height: 50px;
  font-size: 15px;
  color: #0a124d;
  padding: 13px 10px;
  font-weight: bold;
  align-items: center;

  margin-left: 20px;
`;
const CountryFlag = styled.img`
  /* 국가 이미지 */
  width: 30px;
  height: 30px;
  margin-right: 10px;
  justify-content: center;
  text-align: center;
`;

const Button = styled.div`
  margin-left: auto;
`;
const SiteButton = styled.button`
  width: 130px;
  height: 30px;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #ffd43b;
  text-align: center;

  &:hover {
    background-color: #c3b246;
    cursor: pointer;
  }
`;

const Community = () => {
  
  return (
    <>
      <CommunityBox>
        <Title>국가별 한인 Community</Title>
        <CommunityDiv>
          <CountryFlag src={canada} />
          캐나다
          <Button>
          <Link to="/postlist/canada">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
            </Link>
          </Button>
        </CommunityDiv>

        <CommunityDiv>
          <CountryFlag src={australia} />
          호주
          <Button>
          <Link to="/postlist/australia">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
          </Link>
          </Button>
        </CommunityDiv>

        <CommunityDiv>
          <CountryFlag src={newzealand} />
          뉴질랜드
          <Button>
          <Link to="/postlist/newzealand">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
            </Link>
          </Button>
        </CommunityDiv>
        <CommunityDiv>
          <CountryFlag src={england} />
          영국
          <Button>
          <Link to="/postlist/england">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
            </Link>
          </Button>
        </CommunityDiv>
        <CommunityDiv>
          <CountryFlag src={netherlands} />
          네덜란드
          <Button>
          <Link to="/postlist/netherlands">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
            </Link>
          </Button>
        </CommunityDiv>
        <CommunityDiv>
          <CountryFlag src={germany} />
          독일
          <Button>
          <Link to="/postlist/germany">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
            </Link>
          </Button>
        </CommunityDiv>
      </CommunityBox>
    </>
  );
};

export default Community;
