import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderWrapper>
      <div>
        <img src="https://sun-learning-ff8.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc0b49070-f848-4e56-98fc-7ff9d972a855%2Flogo_pxl_b.png?table=block&id=7c93a0fb-5499-4d9b-97c1-c2f7e0561785&spaceId=06605955-0fd9-4614-ba9a-0812be412dbe&width=2000&userId=&cache=v2" />
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
position:fixed:
top:0;
width: calc(100% - 20px);
height:40px;
padding : 20px 0 0 20px;
  div {
    width: 100px;
    img {
      width: 100%;
    }
  }
`;
