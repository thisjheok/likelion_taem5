import React from "react";
import styled from "styled-components";

const ContentBox = styled.div`
  width: 520px;
  height: 450px;
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
`;
const CountryBox = styled.div`
  display: flex;
  width: 450px;
  height: 50px;
  font-size: 15px;
  color: #0a124d;
  padding: 15px 10px;
  font-weight: 600;
  align-items: center;
  /* text-align: center; */
  margin-left: 20px;
`;

const CountryTag = styled.div`
  display: flex;
  width: 300px;
  height: 40px;
  margin-left: auto;
  justify-content: space-around;
`;
const SiteButton = styled.button`
  display: flex;
  width: 75px;
  height: 30px;
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 0px 5px 0px 5px;
  border: none;
  color: white;
  font-weight: bold;
  background-color: #ffd43b;
  text-align: center;
  justify-content: center;

  &:hover {
    background-color: #fafabe;
    cursor: pointer;
    color: #0a124d;
  }
`;

const InfoCard = () => {
  return (
    <>
      <ContentBox>
        <Title>Working Holiday Information</Title>
        <CountryBox>
          북아메리카
          <CountryTag>
            <SiteButton>캐나다</SiteButton>
          </CountryTag>
        </CountryBox>
        <CountryBox>
          유럽
          <CountryTag>
            <SiteButton>네덜란드</SiteButton>
            <SiteButton>독일</SiteButton>
            <SiteButton>스웨덴</SiteButton>
            <SiteButton>스페인</SiteButton>
          </CountryTag>
        </CountryBox>
        <CountryBox>
          아시아
          <CountryTag>
            <SiteButton>홍콩</SiteButton>
            <SiteButton>대만</SiteButton>
            <SiteButton>일본</SiteButton>
          </CountryTag>
        </CountryBox>
        <CountryBox>
          남아메리카
          <CountryTag>
            <SiteButton>칠레</SiteButton>
            <SiteButton>아르헨티나</SiteButton>
          </CountryTag>
        </CountryBox>
        <CountryBox>
          오세아니아
          <CountryTag>
            <SiteButton>호주</SiteButton>
            <SiteButton>뉴질랜드</SiteButton>
          </CountryTag>
        </CountryBox>
      </ContentBox>
    </>
  );
};

export default InfoCard;
