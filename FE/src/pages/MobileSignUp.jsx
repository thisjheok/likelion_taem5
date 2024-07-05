import React from 'react';
import styled from 'styled-components';
import logoImage from '../assets/Biglogo.png';

const PageContainer = styled.div`
  width: 390px;
  height: 844px;
  background-color: #FFF9C4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const LogoImage = styled.img`
  width: 70%;
  height: auto;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  width: 90%;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

const FormDescription = styled.p`
  font-size: 12px;
  margin-bottom: 15px;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 13px;
  display: block;
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  width: 45%;
`;

const SubmitButton = styled(Button)`
  background-color: #FFD700;
  color: #000;
`;

const CancelButton = styled(Button)`
  background-color: #E0E0E0;
  color: #000;
`;

const MobileSignUp = () => {
  return (
    <PageContainer>
      <LogoImage src={logoImage} alt="Through World" />
      <FormContainer>
        <FormTitle>회원가입</FormTitle>
        <FormDescription>계정을 만들기 위해 정보를 입력해주세요</FormDescription>
        <InputGroup>
          <Label>이름</Label>
          <Input type="text" />
        </InputGroup>
        <InputGroup>
          <Label>생년월일</Label>
          <Input type="text" placeholder="연도 . 월 . 일" />
        </InputGroup>
        <InputGroup>
          <Label>성별</Label>
          <Input type="text" />
        </InputGroup>
        <InputGroup>
          <Label>이메일</Label>
          <Input type="email" />
        </InputGroup>
        <InputGroup>
          <Label>전화번호</Label>
          <Input type="tel" />
        </InputGroup>
        <ButtonContainer>
          <SubmitButton>Submit</SubmitButton>
          <CancelButton>Cancel</CancelButton>
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default MobileSignUp;