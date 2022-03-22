import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import { getProducts, getRegions } from "api/api";
import Header from "components/Header";
import ListItem from "components/ListITem";
import RegionItem from "components/RegionItem";
import SearchBar from "components/SearchBar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface locationObj {
  keyword: string;
  type: "KEYWORD" | "URL" | "CODE";
}

interface productObj {
  product_code: number;
  name: string;
  image_url: string;
  price: number;
  category_names: string[];
}

interface regionObj {
  product_code: number;
  region_id: number;
  image_url: string;
  gender: string;
  attributes: [
    {
      style: string;
    },
    {
      season: string;
    },
    {
      occasion: string;
    },
    {
      fabric: string;
    },
    {
      sense: string;
    },
    {
      pattern: string;
    }
  ];
  category_names: string[];
}

interface Istore {
  name: string;
  searchList: [];
  searchDetail: [];
}
const PixelDetails = () => {
  const location = useLocation().state as locationObj;
  const [products, setProducts] = useState<[]>();
  const [isDebounce, setIsDebounce] = useState(false);
  const [regionData, setRegionData] = useState<[] | null>();
  const [searchProductName, setSearchProductName] = useState<string>();
  const localStorage = window.localStorage;
  const currentStore = localStorage.getItem("searchedStore");
  const { keyword, type } = location;
  const skeletonArray = new Array(20).fill("");
  const navigate = useNavigate();

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

  const isMatchRegionData = async (code: number) => {
    const { regionData } = await fetchData();
    const filteredRegionData = regionData.filter((list: regionObj) => {
      return list.product_code === code;
    });
    return filteredRegionData;
  };

  const isMatchCode = async (code: number) => {
    const { productsData } = await fetchData();
    const filteredCodeData = productsData.filter((list: productObj) => {
      return list.product_code === code;
    });
    return filteredCodeData;
  };

  const isExist = (currentStore: [], keyword: string | undefined) => {
    const existStore = currentStore.filter(
      (list: Istore) => list.name === keyword
    ).length
      ? currentStore.filter((list: Istore) => list.name === keyword)
      : [];

    return existStore;
  };

  const handleStore = (
    keyword: string | undefined,
    type: "KEYWORD" | "URL" | "CODE"
  ) => {
    const storeData = {
      name: keyword,
      searchList: products,
      searchDetail: regionData,
    };
    if (currentStore) {
      const parseStore = JSON.parse(currentStore);
      if (isExist(parseStore, keyword).length === 0) {
        localStorage.setItem(
          "searchedStore",
          JSON.stringify([...parseStore, storeData])
        );
      }
    } else {
      localStorage.setItem("searchedStore", JSON.stringify([storeData]));
    }
  };
  const handleError = () => {
    alert("검색 결과가 없습니다");
    navigate("/pixel");
    return;
  };

  const showAllProducts = async () => {
    if (type === "KEYWORD") {
      const filteredKeyword = await isMatchKeyword(keyword);
      if (!filteredKeyword.length) {
        handleError();
      }
      if (currentStore) {
        const parseStore = JSON.parse(currentStore);
        // console.log(searchProductName);
        if (isExist(parseStore, keyword).length) {
          const existData = isExist(parseStore, keyword)[0];
          const { name, searchList } = existData;
          setProducts(searchList);
          setSearchProductName(name);
        } else {
          setProducts(filteredKeyword);
          setSearchProductName(keyword);
        }
      } else {
        setProducts(filteredKeyword);
        setSearchProductName(keyword);
      }
    }
    if (type === "URL") {
      const filteredKeyword = await isMatchKeyword(keyword);
      const regionCode = filteredKeyword[0].product_code;
      const filteredRegionData = await isMatchRegionData(regionCode);
      const filteredCategory = await isMatchCategory(filteredKeyword[0]);

      if (!filteredKeyword.length) {
        handleError();
      }

      if (currentStore) {
        const parseStore = JSON.parse(currentStore);
        // console.log(searchProductName);
        if (isExist(parseStore, filteredKeyword[0].name).length) {
          const existData = isExist(parseStore, filteredKeyword[0].name)[0];
          const { name, searchList, searchDetail } = existData;
          setProducts(searchList);
          setRegionData(searchDetail);
          setSearchProductName(name);
        } else {
          setProducts(filteredCategory);
          setRegionData(filteredRegionData);
          setSearchProductName(filteredKeyword[0].name);
        }
      } else {
        setProducts(filteredCategory);
        setRegionData(filteredRegionData);
        setSearchProductName(filteredKeyword[0].name);
      }
    }
    if (type === "CODE") {
      const filteredCodeData = await isMatchCode(Number(keyword));
      const regionCode = filteredCodeData[0].product_code;
      const filteredRegionData = await isMatchRegionData(regionCode);
      const filteredCategory = await isMatchCategory(filteredCodeData[0]);

      if (!filteredCodeData.length) {
        handleError();
      }

      if (currentStore) {
        const parseStore = JSON.parse(currentStore);
        // console.log(searchProductName);
        if (isExist(parseStore, filteredCodeData[0].name).length) {
          const existData = isExist(parseStore, filteredCodeData[0].name)[0];
          const { name, searchList, searchDetail } = existData;
          setProducts(searchList);
          setRegionData(searchDetail);
          setSearchProductName(name);
        } else {
          setProducts(filteredCategory);
          setRegionData(filteredRegionData);
          setSearchProductName(filteredCodeData[0].name);
        }
      } else {
        setProducts(filteredCategory);
        setRegionData(filteredRegionData);
        setSearchProductName(filteredCodeData[0].name);
      }
    }
  };

  useEffect(() => {
    showAllProducts();
    if (searchProductName) {
      handleStore(searchProductName, type);
    }
    setTimeout(() => {
      setIsDebounce(true);
    }, 1000);
  }, [keyword, searchProductName]);

  return (
    <>
      <Header></Header>
      <DetailSearch>
        <TagWrapper>
          <CurrentKeywordTag>{searchProductName}</CurrentKeywordTag>
          {currentStore
            ? JSON.parse(currentStore)
                .filter((item: any) => item.name !== searchProductName)
                .map((list: any) => (
                  <KeywordTag
                    key={list.name}
                    onClick={() => setSearchProductName(list.name)}
                  >
                    {list.name}
                  </KeywordTag>
                ))
            : ""}
        </TagWrapper>
        <SearchBarWrapper>
          <SearchBar setIsDebounce={setIsDebounce}></SearchBar>
        </SearchBarWrapper>
      </DetailSearch>
      <MainWrapper>
        {type !== "KEYWORD" && isDebounce ? (
          <URLWrapper>
            {regionData?.map((list, idx) => (
              <RegionItem
                list={list}
                productName={searchProductName}
                key={idx}
              ></RegionItem>
            ))}
          </URLWrapper>
        ) : (
          ""
        )}

        <GridWrapper>
          <ResultWrapper color={type}>
            {products && isDebounce
              ? products?.map((list: productObj) => (
                  <ListItem
                    list={list}
                    size={"100%"}
                    key={list.product_code}
                  ></ListItem>
                ))
              : skeletonArray.map((list, idx) => (
                  <SkeletonWrapper key={idx}>
                    <Skeleton
                      variant="rectangular"
                      width={180}
                      height={230}
                    ></Skeleton>
                    <Skeleton
                      variant="rectangular"
                      width={150}
                      height={20}
                      style={{ margin: "10px 0px" }}
                    ></Skeleton>
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={20}
                    ></Skeleton>
                  </SkeletonWrapper>
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
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
`;
const TagWrapper = styled.div`
  width: 30%;
  margin-right: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
`;

const CurrentKeywordTag = styled.div`
  padding: 10px 20px;
  margin-right: 10px;
  font-weight: 600;
  background-color: #6c5ce7;
  color: white;
  border-radius: 5px;
  width: max-content;
  white-space: nowrap;
`;
const KeywordTag = styled.div`
  padding: 10px 20px;
  margin-right: 10px;
  font-weight: 600;
  background-color: white;
  color: #6c5ce7;
  border: solid 1px #6c5ce7;
  border-radius: 5px;
  width: max-content;
  white-space: nowrap;
`;
const SearchBarWrapper = styled.div`
  width: 60%;
`;
const MainWrapper = styled.main`
  width: 100vw;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const URLWrapper = styled.div`
  margin: 20px 0 20px 20px;
  width: 40%;
`;
const GridWrapper = styled.div`
  margin: 20px;
  width: 60%;
`;
const ResultWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 501px) and (max-width: 960px) {
    grid-template-columns: ${(props) =>
      props.color === "KEYWORD" ? "repeat(3, 1fr)" : "repeat(3, 1fr)"};
  }
  @media (min-width: 961px) and (max-width: 1900px) {
    grid-template-columns: ${(props) =>
      props.color === "KEYWORD" ? "repeat(4, 1fr)" : "repeat(3, 1fr)"};
  }
  @media (min-width: 1191px) {
    grid-template-columns: ${(props) =>
      props.color === "KEYWORD" ? "repeat(5, 1fr)" : "repeat(4, 1fr)"};
  }
`;
const SkeletonWrapper = styled.div`
  border: solid 1px #e0e0e0;
  border-radius: 10px;
  padding: 10px 10px 40px 10px;
`;
