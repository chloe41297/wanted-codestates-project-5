import styled from "@emotion/styled";
import Header from "components/Header";
import SearchBar from "../components/SearchBar";

const PixelMain = () => {
  return (
    <>
      <Header></Header>
      <Main>
        <MainCopy>
          <strong>Artificial Intelligence </strong>
          <br /> PXL <strong>Fashion</strong> Viewer
        </MainCopy>
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
  flex-direction: column;
`;
const MainCopy = styled.div`
  font-size: 50px;
  text-align: center;
  line-height: 60px;

  margin-bottom: 60px;
`;
