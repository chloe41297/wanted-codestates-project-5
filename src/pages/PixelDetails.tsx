import styled from "@emotion/styled";
import { getProducts, getRegions } from "api/api";
import Header from "components/Header";
import ListItem from "components/ListITem";
import SearchBar from "components/SearchBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface locationObj {
  keyword: string;
  type: string;
}

interface productObj {
  product_code: number;
  name: string;
  image_url: string;
  price: number;
  category_names: string[];
}

const PixelDetails = () => {
  const location = useLocation().state as locationObj;
  const [products, setProducts] = useState<[] | null>();
  const [pickedProduct, setPickedProduct] = useState<any>();
  const { keyword, type } = location;

  const fetchData = async () => {
    const productsData = await getProducts();
    const regionData = await getRegions();
    return { productsData, regionData };
  };

  const isMatchKeyword = async (text: string) => {
    const { productsData } = await fetchData();
    const filteredKeyword = productsData.filter((list: productObj) => {
      return type === "KEYWORD"
        ? list.name.includes(text)
        : list.image_url.includes(text);
    });
    return filteredKeyword;
  };

  const isMatchCategory = async (select: productObj) => {
    const { productsData } = await fetchData();
    const category = select.category_names[0];
    const filteredCategory = productsData.filter((list: productObj) => {
      return list.category_names.includes(category);
    });
    return filteredCategory;
  };

  const showAllProducts = async () => {
    const filteredKeyword = await isMatchKeyword(keyword);
    const filteredCategory = await isMatchCategory(filteredKeyword[0]);
    if (type === "KEYWORD") {
      setProducts(filteredKeyword);
    }
    if (type === "URL") {
      setPickedProduct([filteredKeyword[0]]);
      setProducts(filteredCategory);
    }
  };

  useEffect(() => {
    showAllProducts();
  }, [keyword]);
  console.log(products);
  return (
    <>
      <Header></Header>
      <DetailSearch>
        <KeywordTag>{type === "KEYWORD" ? keyword : ""}</KeywordTag>
        <SearchBar></SearchBar>
      </DetailSearch>
      <MainWrapper>
        {type === "URL" && (
          <URLWrapper>
            {pickedProduct?.map((list: productObj) => (
              <ListItem
                list={list}
                size={"500px"}
                key={list.product_code}
              ></ListItem>
            ))}
          </URLWrapper>
        )}
        <GridWrapper>
          <ResultWrapper color={type}>
            {products?.map((list: productObj) => (
              <ListItem
                list={list}
                size={"100%"}
                key={list.product_code}
              ></ListItem>
            ))}
          </ResultWrapper>
        </GridWrapper>
      </MainWrapper>
    </>
  );
};
export default PixelDetails;

const Wrapper = styled.section``;

const DetailSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const KeywordTag = styled.div`
  padding: 10px 20px;
  margin: 0 30px;
  font-weight: 600;
  background-color: #6c5ce7;
  color: white;
  border-radius: 5px;
`;
const MainWrapper = styled.main`
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
const URLWrapper = styled.div`
  margin: 20px;
`;
const GridWrapper = styled.div`
  margin: 20px 20px 0 0;
  width: 100%;
`;
const ResultWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  min-width: 600px;
  max-width: 1600px;

  grid-template-columns:
    repeat(2, 1fr)
    @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 501px) and (max-width: 960px) {
    grid-template-columns: ${(props) =>
      props.color === "KEYWORD" ? "repeat(3, 1fr)" : "repeat(2, 1fr)"};
  }
  @media (min-width: 961px) and (max-width: 1900px) {
    grid-template-columns: ${(props) =>
      props.color === "KEYWORD" ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
  }
  @media (min-width: 1191px) {
    grid-template-columns: ${(props) =>
      props.color === "KEYWORD" ? "repeat(5, 1fr)" : "repeat(3, 1fr)"};
  }
`;
