import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../assets/Biglogo.png';
import { dummyPosts } from '../dummyPost';
import { hotPosts } from '../HotPost';

const PageContainer = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 60px;
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const PostTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;

const PostInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
`;

const PostBody = styled.div`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const LikeButton = styled.button`
  background-color: ${props => props.liked ? '#ff4081' : '#e0e0e0'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 15px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 20px 0 0 20px;
`;

const CommentSubmit = styled.button`
  padding: 8px 16px;
  background-color: #FFD43B;
  color: #0a124d;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
`;

const Comment = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 13px;
`;

const MobilePostRead = () => {
  const { type, postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    let post;
    if (type === 'dummy') {
      post = dummyPosts.find(p => p.id === parseInt(postId));
    } else if (type === 'hot') {
      post = hotPosts.find(p => p.id === parseInt(postId));
    }

    if (post) {
      setPostData(post);
      setLiked(false);
    }
  }, [type, postId]);

  const handleLike = () => {
    setLiked(!liked);
    setPostData(prev => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        author: "아기사자",
        content: newComment
      };
      setPostData(prev => ({
        ...prev,
        comments: [...prev.comments, newCommentObj]
      }));
      setNewComment('');
    }
  };

  if (!postData) return <PageContainer><Content>글을 찾을 수 없습니다.</Content></PageContainer>;

  return (
    <PageContainer>
      <Header>
        <LogoImage src={logoImage} alt="Through World" />
      </Header>
      <Content>
        <PostTitle>{postData.title}</PostTitle>
        <PostInfo>작성자: {postData.author} | 작성일: {postData.date}</PostInfo>
        <PostBody>{postData.content}</PostBody>
        <LikeButton onClick={handleLike} liked={liked}>
          ❤️ 좋아요 {postData.likes}
        </LikeButton>
        <CommentSection>
          <h3>댓글</h3>
          {postData.comments.map((comment) => (
            <Comment key={comment.id}>
              <strong>{comment.author}: </strong>{comment.content}
            </Comment>
          ))}
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <CommentSubmit type="submit">등록</CommentSubmit>
          </CommentForm>
        </CommentSection>
      </Content>
    </PageContainer>
  );
}

export default MobilePostRead;
