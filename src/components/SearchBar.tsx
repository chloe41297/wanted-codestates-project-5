import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface props {
  setIsDebounce?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const SearchBar = ({ setIsDebounce }: props) => {
  const [isWrite, setIsWrite] = useState(false);
  const navigate = useNavigate();

  const handleInputType = (input: string) => {
    const regExp = /^http[s]?:\/\//i;
    if (regExp.test(input)) {
      return "URL";
    }
    if (!isNaN(Number(input))) {
      return "CODE";
    }
    return "KEYWORD";
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isWrite) {
      const currentValue = e.currentTarget.search.value;
      if (setIsDebounce) {
        setIsDebounce(false);
      }
      if (handleInputType(currentValue) === "URL") {
        navigate(`/pixel/products/image_url=?${currentValue}`, {
          state: {
            keyword: currentValue,
            type: "URL",
          },
        });
      } else if (handleInputType(currentValue) === "KEYWORD") {
        navigate(`/pixel/products/keyword=?${currentValue}`, {
          state: {
            keyword: currentValue,
            type: "KEYWORD",
          },
        });
      } else if (handleInputType(currentValue) === "CODE") {
        navigate(`/pixel/products/product_code=?${currentValue}`, {
          state: {
            keyword: currentValue,
            type: "CODE",
          },
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setIsWrite(true);
    } else {
      setIsWrite(false);
    }
  };

  return (
    <Section>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          placeholder="IMAGE URL or KEYWORD"
          name="search"
          onChange={handleChange}
        ></Input>
        <Button
          style={{
            backgroundColor: isWrite ? " #6c5ce7" : "",
            color: isWrite ? "white" : "black",
          }}
        >
          검색
        </Button>
      </Form>
    </Section>
  );
};
export default SearchBar;

const Section = styled.section``;

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
  width: 80px;
  height: 40px;
  margin: 0 20px;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
`;
