import styled from "@emotion/styled";
import { getProducts, getRegions } from "api/api";
import Header from "components/Header";
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
        <KeywordTag>
          {type === "keyword" ? keyword : pickedProduct[0]?.name}
        </KeywordTag>
        <SearchBar></SearchBar>
      </DetailSearch>
      <MainWrapper>
        {type === "URL" && (
          <URLWrapper>
            {pickedProduct?.map((list: productObj) => (
              <Item key={list.product_code}>
                <ImgWrapper>
                  <Img src={list.image_url}></Img>
                </ImgWrapper>
                <ItemName>{list.name}</ItemName>
                <ItemPrice> ₩{list.price.toLocaleString()}</ItemPrice>
              </Item>
            ))}
          </URLWrapper>
        )}

        <ResultWrapper>
          {products?.map((list: productObj) => (
            <Item key={list.product_code}>
              <ImgWrapper>
                <Img src={list.image_url}></Img>
              </ImgWrapper>
              <ItemName>{list.name}</ItemName>
              <ItemPrice> ₩{list.price.toLocaleString()}</ItemPrice>
            </Item>
          ))}
        </ResultWrapper>
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
const URLWrapper = styled.div`
  width: 20%;
  position: fixed;
  top: 300px;
  left: 20px;
`;
const ResultWrapper = styled.div`
  width: calc(100% - 80px);
  margin: 20px 40px;
  display: grid;
  grid-gap: 20px;
  min-width: 600px;
  max-width: 1600px;
  grid-template-columns: repeat(3, 1fr);
  @media (min-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) and (max-width: 999px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(6, 1fr);
    margin: 20px auto;
  }
`;
const Item = styled.div`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 70%;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;
const ItemName = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
`;
const ItemPrice = styled.div`
  font-size: 18px;
  color: #6c5ce7;
  font-weight: 600;
  text-align: end;
  padding: 10px;
`;
