import React,{ useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [formData, setFormData] = useState({
    username: '',
    birth_date: '',
    gender: 'M',
    email: '',
    phone_number: '',
    id: '',
    password: '',
    password_confirm: ''
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id.replace('id_', '')]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('약관에 동의해주세요.');
      return;
    }
    if (formData.password !== formData.password_confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post('http://43.200.226.225/signup/', formData);
      if (response && response.data) {
        console.log(response.data);
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } else {
        throw new Error('서버 응답이 없습니다.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      if (error.response) {
        // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
        console.error('Server responded with:', error.response.data);
        alert(`회원가입에 실패했습니다: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // 요청이 전송되었지만 응답을 받지 못한 경우
        console.error('No response received:', error.request);
        alert('서버로부터 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.');
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        console.error('Error setting up the request:', error.message);
        alert('요청 설정 중 오류가 발생했습니다.');
      }
    }
  };

  const cancelClick = () => {
    navigate('/Login');
  };

  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <LogoImage src={logoImage}/>
        <Title>회원가입</Title>
        <Subtitle>계정을 만들기 위해 정보를 입력해주세요</Subtitle>
        <LabelContainer>
          <Label htmlFor="id_username">이름</Label>
          <Input id="id_username" type="text" placeholder="이름" onChange={handleChange} required />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="id_birth_date">생년월일</Label>
          <Input id="id_birth_date" type="date" onChange={handleChange} required />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="id_gender">성별</Label>
          <Select id="id_gender" onChange={handleChange} required>
            <option value="M">남자</option>
            <option value="F">여자</option>
          </Select>
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="id_email">이메일</Label>
          <Input id="id_email" type="email" placeholder="이메일" onChange={handleChange} required />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="id_phone_number">전화번호</Label>
          <Input id="id_phone_number" type="text" placeholder="전화번호" onChange={handleChange} required />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="id_id">아이디</Label>
          <Input id="id_id" type="text" placeholder="아이디" onChange={handleChange} required />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="id_password">비밀번호</Label>
          <Input id="id_password" type="password" placeholder="비밀번호" onChange={handleChange} required />
        </LabelContainer>
        <LabelContainer>
          <Label htmlFor="id_password_confirm">비밀번호 확인</Label>
          <Input id="id_password_confirm" type="password" placeholder="비밀번호 확인" onChange={handleChange} required />
        </LabelContainer>
        <CheckboxContainer>
          <Checkbox type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <label><a href="#">자사의 정책과 조건</a>에 동의합니다.</label>
        </CheckboxContainer>
        <ButtonContainer>
          <Button type="submit">Submit</Button>
          <Button type="button" cancel onClick={cancelClick}>Cancel</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default SignUp;