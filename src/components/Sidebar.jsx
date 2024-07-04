import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 200px;
  height: 600px;
  margin-top: 10px;
  margin-left: 5px;
  border-radius: 20px;
  border: 0.1px solid #eff0eb;
  box-shadow: 0 0.375rem 0.75rem rgba(140, 152, 164, 0.075);
`;

const Category = styled(Link)`
  width: 178.6px;
  height: 37px;
  color: #132144;
  margin: 0px 0px 4px;
  padding: 8px 14px;
  font-size: 13px;
  text-align: center;
  font-weight: 400;
  text-decoration: none;
  display: block;
  &:hover {
    color: #6e6e6e;
    cursor: pointer;
  }
`;
const TitleName = styled.div`
  width: 178.6px;
  height: 37px;
  color: #ffd43b;
  margin: 0px 0px 4px;
  padding: 8px 14px;
  font-size: 13px;
  text-align: center;
  font-weight: 600;
`;

// text : 해외취업, 어학연수, 워홀 중에 Home 에서 선택하면 받는 props
const Sidebar = ({ text }) => {
  return (
    <>
      <Container>
        <TitleName>{text}</TitleName>
        <Category to={`/communitypage/${text}`}>{text} 커뮤니티</Category>
        <Category to={`/review/${text}`}>{text} 국가별 후기</Category>
        <Category to="/leavinginfo">출국 전 정보</Category>
        <Category to="/abroadlife">도착 후 해외 생활 정보</Category>
        <Category to="/arrive">귀국 전 정보</Category>
        <Category to="/groupbuying">물품 공동구매</Category>
      </Container>
    </>
  );
};

export default Sidebar;
