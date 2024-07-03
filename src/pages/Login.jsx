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
  max-width: 400px;
  text-align: center;
`;

const Title = styled.div`
  margin-bottom: 1rem;
`;

const LogoImage = styled.img`
  width: 60%;
  height: auto;
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
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  margin-top: 20px;
  background: #FFD43B;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #c3b246;
  }
`;

const Anchor=styled.a`
  text-decoration-line: none;
  color: #b4a441;
`

const Login = () => {
  const navigate = useNavigate();
  const sigininBtn = ()=>{
    navigate('/Choice');
  }
  return (
    <Container>
      <Form>
        <Title><LogoImage src={logoImage}/></Title>
        <Subtitle>
          처음이신가요? <Anchor href="/SignUp">계정 만들기</Anchor>
        </Subtitle>
        <Input type="id" placeholder="아이디"/>
        <Input type="password" placeholder="비밀번호" />
        <Anchor href="#">비밀번호를 잊으셨나요?</Anchor>
        <Button onClick={sigininBtn}>Sign In</Button>
      </Form>
    </Container>
  );
};

export default Login;

