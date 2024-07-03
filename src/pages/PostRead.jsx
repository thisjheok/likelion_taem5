import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


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

const LikeButton = styled.button`
  background-color: ${props => props.liked ? '#ff4081' : '#e0e0e0'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
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
  background-color: #FFD43B;
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

// 가상의 API 호출 함수 (실제 구현 시 이 부분을 실제 API 호출로 대체)
const fetchPostData = async (postId) => {
    // 실제로는 여기서 백엔드 API를 호출합니다
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: postId,
          title: "파리 워킹홀리데이 후기",
          author: "재혁",
          date: "2024. 4. 1. 0:00",
          content: "본문 내용~",
          likes: 10,
          comments: [
            { id: 1, author: "user1", content: "좋은 글이네요!" },
            { id: 2, author: "user2", content: "재미있게 읽었습니다." }
          ]
        });
      });
    });
  };



const PostRead = () => {
    const [postData, setPostData] = useState(null);
    const [liked, setLiked] = useState(false);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const loadPostData = async () => {
            const data = await fetchPostData("somePostId"); // 실제로는 여기에 동적 postId를 넣습니다
            setPostData(data);
            setLiked(false); // 초기 상태 설정
        };
        loadPostData();
    }, []);

    const handleLike = () => {
        setLiked(!liked);
        setPostData(prev => ({
            ...prev,
            likes: liked ? prev.likes - 1 : prev.likes + 1
        }));
        // 여기서 좋아요 상태를 백엔드에 업데이트하는 API 호출을 할 수 있습니다
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const newCommentObj = {
                id: Date.now(), // 임시 ID
                author: "현재 사용자", // 실제로는 로그인한 사용자 정보를 사용
                content: newComment
            };
            setPostData(prev => ({
                ...prev,
                comments: [...prev.comments, newCommentObj]
            }));
            setNewComment('');
            // 여기서 새 댓글을 백엔드에 저장하는 API 호출을 할 수 있습니다
        }
    };

    if (!postData) return <div>로딩 중...</div>;

    return (
        <>
            <Header />
            <Container>
                <Sidebar />
                <MainContent>
                    <PostTitle>{postData.title}</PostTitle>
                    <PostInfo>작성자: {postData.author} | 작성일: {postData.date}</PostInfo>
                    <PostBody>{postData.content}</PostBody>
                    <LikeButton onClick={handleLike} liked={liked}>
                        ❤️ 좋아요 {postData.likes}
                    </LikeButton>
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
                        {postData.comments.map((comment) => (
                            <Comment key={comment.id}>
                                <strong>{comment.author}: </strong>{comment.content}
                            </Comment>
                        ))}
                    </CommentSection>
                </MainContent>
            </Container>
        </>
    );
}

export default PostRead;