import React from "react";
import styled from "styled-components";

const KeywordContainer = styled.div`
  display: flex;
  width: 900px;
  align-items: center; /* 세로 방향으로 중앙 정렬 */
  background-color: none;
  border: none;
  color: #0a124d;
  padding: 15px 32px;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  margin: 4px 10px;
  justify-content: space-around;
  border-bottom: 0.1px solid #eff0eb;
`;
const KeywordBox = styled.div`
  /* flex-direction: row; */
  background-color: white;
  text-align: center;
  width: 160px;
  height: 50px;
  padding: 10px;
  box-shadow: 0 0.375rem 0.375rem #fafabe;
  border: 0.1px solid #fafabe;
  margin: auto;
  margin-bottom: 10px;
  border: 0.1px solid #eff0eb;
  &:hover {
    box-shadow: 0 0.375rem 0.75rem rgba(140, 152, 164, 0.075);
    border-radius: 10px;
    cursor: pointer;
  }
`;
const Keyword = styled.div`
  width: 90px;
  height: 20px;
  text-align: center;
  justify-content: center;
  background-color: #fafabe;
  font-size: 12px;
  border-radius: 10px;
  border: none;
  padding: 3px 3px;
  margin: 5px 0px 3px 30px;
`;

const KeyWord = () => {
  return (
    <KeywordContainer>
      <KeywordBox>
        Hot Keyword
        <Keyword>#비자발급</Keyword>
      </KeywordBox>
      <KeywordBox>
        New Information
        <Keyword>비자 연장</Keyword>
      </KeywordBox>
      <KeywordBox>
        Event
        <Keyword>eSIM 이벤트</Keyword>
      </KeywordBox>
    </KeywordContainer>
  );
};

export default KeyWord;
