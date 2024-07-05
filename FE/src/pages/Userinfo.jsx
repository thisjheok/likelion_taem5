import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/Biglogo.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f7fc;
`;

const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  text-align: center;
  overflow-y: auto; /* 폼이 화면을 넘어갈 때 스크롤바가 생기도록 함 */
  max-height: 90vh; /* 최대 높이를 설정해서 화면을 벗어나지 않도록 함 */
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Text = styled.div`
  display: flex;
  width: 80%;
  padding: 0.75rem;
  margin: 0.3rem 0;
  border-radius: 4px;
  box-sizing: border-box; /* 박스의 크기를 맞추기 위해 추가 */
  align-items: center;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1%;
`;

const Button = styled.button`
  width: 49%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: ${(props) => (props.id ? "#FFD43B" : "#e0e0e0")};
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.cancel ? "#d5d5d5" : "#c3b246")};
  }
`;
const Point = styled.div`
  width: 80%;
  padding: 10px;
  margin: 0.3rem 0;
  border-radius: 4px;
`;
const PointBtn = styled.button`
  width: 35%;
  padding: 0.5rem;
  margin-left: 30px;
  background: ${(props) => (props.point ? "#FFD43B" : "#e0e0e0")};
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: "#d5d5d5";
  }
`;

const LogoImage = styled.img`
  width: 60%;
  height: auto;
`;

const LabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0.5rem 0;
`;

const Label = styled.label`
  margin-bottom: 0.3rem;
  font-size: 15px;
  font-weight: bold;
`;

const UserInfo = () => {
  const navigate = useNavigate();

  const deleteId = () => {
    navigate("/");
  };

  return (
    <Container>
      <Form>
        <LogoImage src={logoImage} />
        <Title>000 님의 개인정보</Title>
        <LabelContainer>
          <Label htmlFor="username">아이디</Label>
          <Text id="username" type="text" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="name">이름</Label>
          <Text id="name" type="text" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="date">생년월일</Label>
          <Text id="date" type="date" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="phone">전화번호</Label>
          <Text id="phone" type="text" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="point">보유 포인트</Label>
          <Point id="point">
            100 P
            <PointBtn point onClick={deleteId}>
              지급내역 확인
            </PointBtn>
          </Point>
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="email">이메일</Label>
          <Text id="email" type="email" />
        </LabelContainer>

        <ButtonContainer>
          <Button id>개인정보 수정</Button>
          <Button onClick={deleteId}>회원탈퇴</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UserInfo;
