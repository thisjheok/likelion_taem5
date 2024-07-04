import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';

const AdvBanner = styled.div`
  width: 890px;
  height: 120px;
  border: 0.1px solid #eff0eb;
  border-radius: 20px;
  box-shadow: 0 0.375rem 0.375rem #fafabe;
  font-size: 20px;
  font-weight: 550;
  color: #0a124d;
  padding: 10px 30px;
`;

const ListTitile = styled.div`
  display: flex;
  width: 830px;
  height: 100px;
  border: none;
  margin-top: 30px;
  text-align: center;
  justify-content: center;
  background-color: none;
`;
const EventList = styled.li`
  /* display: flex; */
  width: 300px;
  height: 30px;
  font-size: 15px;
  color: #0a124d;
`;
const Button = styled.div`
  display: flex;
  /* margin-left: auto; */
`;
const SiteButton = styled.button`
  width: 130px;
  height: 30px;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  color: #0a124d;
  background-color: #fafabe;
  text-align: center;

  &:hover {
    background-color: #ffd43b;
    cursor: pointer;
    color: white;
  }
`;

const Event = () => {
  return (
    <>
      <AdvBanner>
        공동구매 & 해외 용품 이벤트
        <ListTitile>
          <EventList>uSIM / eSIM 공동구매 할인 이벤트 </EventList>
          <Button>
          <Link to="/GroupBuying">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
            </Link>
          </Button>
          <EventList>변압기 공동구매</EventList>
          <Button>
          <Link to="/GroupBuying">
            <SiteButton>
              Go to page <FontAwesomeIcon icon={faShareFromSquare} />
            </SiteButton>
            </Link>
          </Button>
        </ListTitile>
      </AdvBanner>
    </>
  );
};

export default Event;
