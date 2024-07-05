import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InfoCard from "../components/InfoCard";
import Community from "../components/Community";
import KeyWord from "../components/KeyWord";
import Event from "../components/Event";

const BackGround = styled.div`
  width: 1200px;
  height: 1000px;
  background-color: white;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
`;
const SectionContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;
const WorkingHoliday = () => {
  return (
    <>
      <Header />
      <BackGround>
        <Sidebar text="워킹홀리데이"></Sidebar>
        <Wrapper>
          <KeyWord />
          <SectionContainer>
            <Community />
            <InfoCard />
          </SectionContainer>
          <Event />
        </Wrapper>
      </BackGround>
    </>
  );
};

export default WorkingHoliday;
