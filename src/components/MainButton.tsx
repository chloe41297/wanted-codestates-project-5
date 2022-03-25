import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const MainButton = () => {
  const pathName = window.location.pathname;
  return (
    <>
      <Link to="/">
        <Main style={{ display: pathName === "/" ? "none" : "block" }}>🏠</Main>
      </Link>
    </>
  );
};

export default MainButton;

const Main = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 40px;
`;
