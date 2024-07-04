import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/Biglogo.png';
import axios from 'axios';

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
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id.replace('id_', '')]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://43.200.226.225/login/', formData);
      console.log('Login successful:', response.data);
      // 로그인 성공 시 처리 (예: 토큰 저장)
      localStorage.setItem('token', response.data.token);
      navigate('/Choice');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <Title><LogoImage src={logoImage} alt="Logo" /></Title>
        <Subtitle>
          처음이신가요? <Anchor href="/SignUp">계정 만들기</Anchor>
        </Subtitle>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <Input 
          type="text" 
          placeholder="아이디" 
          id="id_username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input 
          type="password" 
          placeholder="비밀번호" 
          id="id_password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Anchor href="#">비밀번호를 잊으셨나요?</Anchor>
        <Button type="submit">Sign In</Button>
      </Form>
    </Container>
  );
};

export default Login;