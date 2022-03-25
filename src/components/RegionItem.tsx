import styled from "@emotion/styled";

interface regionObj {
  list: {
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
  };
  productName: any;
}

const RegionItem = ({ list, productName }: regionObj) => {
  return (
    <ItemWrapper>
      <Img src={list.image_url}></Img>
      <Title>ITEMS</Title>
      <ProductName>{productName}</ProductName>
      <Title style={{ borderTop: "solid 1px #e0e0e0" }}>ATTRIBUTES</Title>
      <TagColor>#Gender</TagColor>
      <TagComment>{list.gender.split(".")[1]}</TagComment>
      <TagColor>#Category</TagColor>
      <Flex>
        {list.category_names.map((name) => (
          <TagComment key={name}>{name.split(".")[1]}</TagComment>
        ))}
      </Flex>

      {list.attributes.map((item, idx) => (
        <div key={idx}>
          <TagColor>#{Object.keys(item)}</TagColor>
          <TagComment>{Object.values(item)}</TagComment>
        </div>
      ))}
    </ItemWrapper>
  );
};

export default RegionItem;

const ItemWrapper = styled.div`
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
  :hover {
    cursor: pointer;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding: 20px 0;
  text-transform: capitalize;
`;
const ProductName = styled.div`
  color: white;
  background-color: #6c5ce7;
  width: 80px;
  padding: 10px 5px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: 600;
`;
const TagColor = styled.div`
  color: #6c5ce7;
  margin: 10px 0;
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
`;
const TagComment = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 400;
  margin-right: 10px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
