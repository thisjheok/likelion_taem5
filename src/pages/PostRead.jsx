import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

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
  background-color: ${(props) => (props.liked ? "#ff4081" : "#e0e0e0")};
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

const postsData = [
  {
    id: 1,
    title: "파리에서의 3일",
    author: "여행자123",
    date: "2023-07-15 0:00",
    content:
      "에펠탑부터 루브르 박물관까지, 파리의 주요 명소를 둘러본 여행기입니다.",
    likes: 42,
    country: "france",
    comments: [
      { id: 1, author: "user1", content: "좋은 글이네요!" },
      { id: 2, author: "user2", content: "재미있게 읽었습니다." },
    ],
  },
  {
    id: 2,
    title: "베르사유 궁전 탐방",
    author: "역사탐험가",
    date: "2023-07-20  0:00",
    content: "프랑스의 역사가 살아숨쉬는 베르사유 궁전을 탐방했습니다.",
    likes: 38,
    comments: [
      { id: 1, author: "user3", content: "정말 멋진 여행이었습니다!" },
      { id: 2, author: "user4", content: "이런 곳도 있었군요!" },
    ],
  },
  {
    id: 3,
    title: "나이아가라 폭포 투어",
    likes: 45,
    author: "명예캐나다인",
    date: "2023-06-30 0:00",
    content: "나이아가라 폭포에서 무지개를 보다!",
    comments: [
      { id: 1, author: "user3", content: "정말 멋진 여행이었습니다!" },
      { id: 2, author: "user4", content: "이런 곳도 있었군요!" },
    ],
  },
  {
    id: 4,
    title: "12사도 투어 후기",
    likes: 65,
    author: "대한호주인",
    date: "2022-12-23 0:00",
    content: "12사도와 그레이트 오션로드를 갔습니다.",
    comments: [
      { id: 1, author: "user3", content: "투어경비 얼마 들었나요?" },
      { id: 2, author: "user4", content: "투어 사이트 알려주세요." },
    ],
  },
  {
    id: 5,
    title: "뉴질랜드 남섬 여행",
    likes: 33,
    author: "키위새는 짹짹",
    date: "2023-11-30 0:00 ",
    content: "친구랑 같이 남섬투어를 신청했어요.",
    comments: [
      { id: 1, author: "user3", content: "남섬 저도 가봤는데 너무 좋아요!" },
      { id: 2, author: "user4", content: "한인 투어였나요?" },
    ],
  },
  // 추가적인 포스트 데이터
];

const PostRead = () => {
  const { postId } = useParams(); // 동적 postId를 받아옵니다
  const [postData, setPostData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // postId에 해당하는 포스트 데이터를 찾아서 설정합니다
    const selectedPost = postsData.find((post) => post.id === parseInt(postId));
    if (selectedPost) {
      setPostData(selectedPost);
      setLiked(false); // 초기 좋아요 상태 설정
    }
  }, [postId]);

  const handleLike = () => {
    setLiked(!liked);
    setPostData((prev) => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1,
    }));
    // 여기서 좋아요 상태를 백엔드에 업데이트하는 API 호출을 할 수 있습니다
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(), // 임시 ID
        author: "현재 사용자", // 실제로는 로그인한 사용자 정보를 사용
        content: newComment,
      };
      setPostData((prev) => ({
        ...prev,
        comments: [...prev.comments, newCommentObj],
      }));
      setNewComment("");
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
          <PostInfo>
            작성자: {postData.author} | 작성일: {postData.date}
          </PostInfo>
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
                <strong>{comment.author}: </strong>
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
