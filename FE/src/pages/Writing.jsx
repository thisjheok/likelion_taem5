import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UpHeader from '../components/Header';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #fff;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Form = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  flex-grow: 1;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 15rem;
`;

const SubmitButton = styled.button`
  background: #FFD43B;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-left: 15rem;

  &:hover{
  background: #efc738;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #888;
  margin-top: 1rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  height: 200px;
  resize: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const Country = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;

    &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`

const SelectWrapper = styled.div`
  position: relative;
  width: 30%;
  margin-right: 1rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  background-color: white;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const SelectArrow = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  &::before {
    content: '▼';
    font-size: 0.8rem;
    color: #888;
  }
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px 15px;
  background-color: #FFD43B;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  &:hover{
  background: #efc738;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Writing = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    const handleCancel = () => {
      navigate('/');
    };

    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
    };

    const handleImageDelete = (index) => {
      setImages(prev => {
        const newImages = [...prev];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        return newImages;
      });
    };

    return(
      <>
        <UpHeader />
        <Container>
          <Sidebar />
          <MainContent>
            <Header>
              <CloseButton onClick={handleCancel}>×</CloseButton>
              <Title>글 쓰기</Title>
              <SubmitButton>완료</SubmitButton>
            </Header>
            <Form>
              <InputGroup>
                <SelectWrapper>
                  <Label htmlFor="continent">대륙</Label>
                  <StyledSelect id="continent">
                    <option value="">대륙 선택</option>
                    <option value="europe">유럽</option>
                    <option value="asia">아시아</option>
                    <option value="africa">아프리카</option>
                    <option value="oceania">오세아니아</option>
                    <option value="americas">아메리카</option>
                  </StyledSelect>
                  <SelectArrow />
                </SelectWrapper>
                <div style={{width: '30%'}}>
                  <Label htmlFor="country">국가</Label>
                  <Country type="text" id="country" placeholder='국가를 입력해주세요'/>
                </div>
              </InputGroup>
              <Label htmlFor="title">제목</Label>
              <Input type="text" id="title" placeholder="제목을 입력하세요" />
              <Label htmlFor="content">내용</Label>
              <TextArea id="content" placeholder="내용을 입력하세요." />
              <div>
                <FileInputLabel htmlFor="image-upload">
                  이미지 업로드
                  <FileInput 
                    type="file" 
                    id="image-upload" 
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                  />
                </FileInputLabel>
              </div>
              <ImagePreviewContainer>
                {images.map((image, index) => (
                  <ImagePreviewWrapper key={index}>
                    <ImagePreview src={image.preview} alt={`미리보기 ${index + 1}`} />
                    <DeleteButton onClick={() => handleImageDelete(index)}>×</DeleteButton>
                  </ImagePreviewWrapper>
                ))}
              </ImagePreviewContainer>

            </Form>
          </MainContent>
        </Container>
      </>
    );
}

export default Writing;