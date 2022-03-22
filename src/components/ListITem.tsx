import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";

interface listObj {
  list: {
    product_code: number;
    name: string;
    image_url: string;
    price: number;
    category_names: string[];
  };
  size: string;
}

const ListItem = ({ list, size }: listObj) => {
  return (
    <>
      <Item style={{ width: `${size}` }}>
        <ImgWrapper>
          <Img
            src={list.image_url}
            onClick={() => {
              window.open(`${list.image_url}`);
            }}
          ></Img>
        </ImgWrapper>
        <ItemName>{list.name}</ItemName>
        <ItemPrice> ₩{list.price.toLocaleString()}</ItemPrice>
      </Item>
    </>
  );
};
export default ListItem;

const Item = styled.div`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  max-width: 350px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  :hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
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
