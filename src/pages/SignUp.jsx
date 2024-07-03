import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/Biglogo.png';

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

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  margin-bottom: 1.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* 박스의 크기를 맞추기 위해 추가 */
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1%;
`;

const Button = styled.button`
  width: 49%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: ${props => props.cancel ? '#e0e0e0' : '#FFD43B'};
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.cancel ? '#d5d5d5' : '#c3b246'};
  }
`;

const LogoImage = styled.img`
  width: 60%;
  height: auto;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* 박스의 크기를 맞추기 위해 추가 */
`;

const LabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0.5rem 0;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 15px;
  font-weight: bold;
`;

const SignUp = () => {
  const navigate = useNavigate();
  
  const cancelClick = () => {
    navigate('/Login');
  };

  return (
    <Container>
      <Form>
        <LogoImage src={logoImage}/>
        <Title>회원가입</Title>
        <Subtitle>계정을 만들기 위해 정보를 입력해주세요</Subtitle>
        <LabelContainer>
          <Label htmlFor="name">이름</Label>
          <Input id="name" type="text" placeholder="이름" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="date">생년월일</Label>
          <Input id="date" type="date" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="gender">성별</Label>
          <Select id="gender">
            <option value="male">남자</option>
            <option value="female">여자</option>
          </Select>
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="이메일" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="phone">전화번호</Label>
          <Input id="phone" type="text" placeholder="전화번호" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="username">아이디</Label>
          <Input id="username" type="text" placeholder="아이디" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" placeholder="비밀번호" />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input id="confirmPassword" type="password" placeholder="비밀번호 확인" />
        </LabelContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" />
          <label><a href="#">자사의 정책과 조건</a>에 동의합니다.</label>
        </CheckboxContainer>
        <ButtonContainer>
          <Button>Submit</Button>
          <Button cancel onClick={cancelClick}>Cancel</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default SignUp;
