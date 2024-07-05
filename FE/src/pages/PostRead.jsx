import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #fff;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PostInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const PostBody = styled.div`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const CommentSection = styled.div`
  margin-top: 30px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
`;

const CommentSubmit = styled.button`
  padding: 10px 20px;
  background-color: #ffd43b;
  color: #0a124d;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;

const Comment = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const PostRead = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const postResponse = await axios.get(`http://43.200.226.225/intern/community/${postId}`);
        setPostData(postResponse.data);
        
        const commentResponse = await axios.get(`http://43.200.226.225/post/comments/list/${postId} `);
        setComments(commentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axios.post(`http://43.200.226.225/comments/${postId}`, {
          content: newComment
        });
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!postData) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <MainContent>
          <PostTitle>{postData.title}</PostTitle>
          <PostInfo>
            작성자: {postData.author_id || '익명'} | 작성일: {postData.created_at || 'Unknown date'}
          </PostInfo>
          <PostBody>{postData.content}</PostBody>
          <CommentSection>
            <h3>댓글</h3>
            <CommentForm onSubmit={handleCommentSubmit}>
              <CommentInput
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요"
              />
              <CommentSubmit type="submit">등록</CommentSubmit>
            </CommentForm>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <strong>{comment.author_id || '익명'}: </strong>
                {comment.content}
              </Comment>
            ))}
          </CommentSection>
        </MainContent>
      </Container>
    </>
  );
};

export default PostRead;