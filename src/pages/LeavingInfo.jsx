import styled from "styled-components";
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 16px;
  background-color: #ffffff;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  ${CardContainer}:hover & {
    background-color: #f5f5f5;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
  ${CardContainer}:hover & {
    color: #FFD43B;
  }
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Author = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const Date = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #999;
`;

const Preview = styled.p`
  margin: 8px 0;
  font-size: 14px;
  color: #333;
`;

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

const FilterButtons = styled.div`
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: ${(props) => (props.active ? "#f8f9fa" : "#FFD43B")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ffd43b;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffd43b;
    color: white;
  }
`;
const Country = styled.div`
    color: #333;
    margin: 0;
    font-size: 24px;
    font-weight: bold;
`

const LeavingInfo = () => {
  return (
    <>
      <Header />
      <PageLayout>
        <Sidebar />
        <MainContent>
            <Country>귀국 전 정보</Country>
          <FilterButtons>
            <FilterButton>자주 찾는 정보</FilterButton>
            <FilterButton>최신순</FilterButton>
          </FilterButtons>
          <PostGrid>
            <CardContainer>
              <CardHeader>
                <Title>항공권</Title>
              </CardHeader>
              <CardBody>
                <Author>
                  관리자 <Date> 2024.7.04</Date>
                </Author>
                <Preview>항공권 구입 방법</Preview>
                <Preview>구매 시 필수 확인사항</Preview>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardHeader>
                <Title>해외 보험</Title>
              </CardHeader>
              <CardBody>
                <Author>
                  관리자 <Date> 2024.7.01</Date>
                </Author>
                <Preview>해외 보험사</Preview>
                <Preview>중복 가입 유의사항</Preview>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardHeader>
                <Title>출국 전 건강검진</Title>
              </CardHeader>
              <CardBody>
                <Author>
                  관리자 <Date> 2024.7.02</Date>
                </Author>
                <Preview>국가별 건강검진 가능 병원</Preview>
                <Preview>검사 비용</Preview>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardHeader>
                <Title>국제 면허증</Title>
              </CardHeader>
              <CardBody>
                <Author>
                  관리자 <Date> 2024.7.05</Date>
                </Author>
                <Preview>국제 면허증 발급 방법</Preview>
                <Preview>한국 운전면허 인정 국가</Preview>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardHeader>
                <Title>국가별 필요 서류</Title>
              </CardHeader>
              <CardBody>
                <Author>
                  관리자 <Date> 2024.7.05</Date>
                </Author>
                <Preview>비자 발급 확인서</Preview>
                <Preview>정착 가능 경제력 확인서</Preview>
              </CardBody>
            </CardContainer>
          </PostGrid>
        </MainContent>
      </PageLayout>
    </>
  );
};

export default LeavingInfo;
