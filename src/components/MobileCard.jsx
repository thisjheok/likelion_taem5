import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MetaInfo = styled.div`
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
`;

const MobileCard = ({ title, content, author, date, likes }) => {
  // 내용을 20자로 제한하는 함수
  const truncateContent = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card>
      <Title>{title}</Title>
      <Content>{truncateContent(content, 20)}</Content>
      <MetaInfo>
        <span>{author} • {date}</span>
        <span>❤️ {likes}</span>
      </MetaInfo>
    </Card>
  );
};

export default MobileCard;