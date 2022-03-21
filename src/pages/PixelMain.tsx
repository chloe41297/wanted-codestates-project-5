import styled from "@emotion/styled";
import Header from "components/Header";
import SearchBar from "../components/SearchBar";

const PixelMain = () => {
  return (
    <>
      <Header></Header>
      <Main>
        <SearchBar></SearchBar>
      </Main>
    </>
  );
};
export default PixelMain;

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
