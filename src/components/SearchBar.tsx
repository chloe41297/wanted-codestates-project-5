import styled from "@emotion/styled";

const SearchBar = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.search.value);
  };

  return (
    <Section>
      <MainCopy>
        <strong>Artificial Intelligence </strong>
        <br /> PXL <strong>Fashion</strong> Viewer
      </MainCopy>
      <Form onSubmit={handleSubmit}>
        <Input placeholder="IMAGE URL or KEYWORD" name="search"></Input>
        <Button>검색</Button>
      </Form>
    </Section>
  );
};
export default SearchBar;

const Section = styled.section``;
const MainCopy = styled.div`
  font-size: 50px;
  text-align: center;
  line-height: 60px;

  margin-bottom: 60px;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 50vw;
  height: 40px;
  border: none;
  border-radius: 20px;
  padding-left: 20px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;
const Button = styled.button`
  width: 60px;
  height: 40px;
  margin: 0 20px;
  border: none;
  border-radius: 5px;
`;
