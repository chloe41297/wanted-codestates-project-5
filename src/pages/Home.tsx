import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Main>
      <Link to="/pixel" style={{ textDecoration: "none" }}>
        <Section>
          <Title>
            PIXEL <br /> 바로가기
          </Title>
          <Square1 id="square1"></Square1>
          <Square2 id="square2"></Square2>
          <Square3 id="square3"></Square3>
        </Section>
      </Link>
    </Main>
  );
};
export default Home;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;
const Section = styled.section`
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration-line: none;
  position: relative;

  :hover {
    #square1 {
      height: 100%;
    }
    #square2 {
      width: 50%;
    }
    #square3 {
      height: 50%;
    }
    h1 {
      color: white;
    }
  }
`;
const Title = styled.h1`
  font-size: 35px;
  text-align: center;
  line-height: 150%;
  color: black;
  z-index: 100;
`;
const Square1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 0;
  background-color: #bc424e;
  opacity: 70%;
  transition: all 0.3s ease-in-out;
`;
const Square2 = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 50%;
  background-color: #2288b5;
  opacity: 70%;
  transition: all 0.3s ease-in-out;
`;
const Square3 = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 0;
  background-color: #81b632;
  opacity: 70%;
  transition: all 0.3s ease-in-out;
`;
